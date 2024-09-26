from unilogics.uniben import Uniben
from unilogics.unizik import Unizik
from unilogics.futa import Futa
from unilogics.unn import Unn
from unilogics.unilag import Unilag
from unilogics.oau import Oau
from unilogics.ui import Ui
import pyinputplus as pyip
import sys
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from universities import universities

# more details to be added to mysql database for easy querying
# i could have a column fpr pass mark(post_utme)
uni_dict = {uni['name']: uni['id'] for uni in universities}
not_support_post_utme = [3, 5, 6, 10]
utme_postutme_olevel = [2, 4]
utme_olevel = [3]
grades_needed = {
    2: 5,
    3: 4,
    4: 5
}

uni_classes = {
    "1": Ui,
    "2": Unilag,
    "3": Unn,
    "4": Oau,
    "7": Futa,
    "8": Unizik,
    "9": Uniben,
}


def create_class_instance(uni_id):
    uni_id_str = str(uni_id)
    _class = uni_classes[uni_id_str]
    _class_instance = _class(uni_id)
    return _class_instance


app = Flask(__name__)


@app.route('/merit', methods=['GET'])
def use_merit():
    """Home Page"""
    return render_template('index.html')


@app.route('/universities/courses', methods=['GET'])
def get_universities_offering_course():
    """Returns a list of universities that offer a specific course"""
    course = request.args.get('course_name')
    if not course:
        return jsonify({"error": "course_name parameter is required"}), 400

    uni_list = []
    for uni in universities:
        if uni["courses"] is not None:
            if course in uni["courses"].keys():
                uni_list.append(uni["name"])

    if not uni_list:
        return jsonify({"message": f"No universities offer {course}"}), 404

    result = {
        "course": course,
        "Universities offering the course": uni_list
    }
    return jsonify(result)


@app.route('/select_university', methods=['GET'])
def display_university_selection():
    return render_template('select_university.html')


@app.route('/universities/selected', methods=['POST'])
def select_university():
    data = request.get_json()
    university_name = data.get('university_name')

    # store the university name in the session
    session['selected_university'] = university_name

    return redirect(url_for('list_functions'))


@app.route('/merit/functions', methods=['GET'])
def list_functions():
    selected_university = session.get('selected_university')

    if not selected_university:
        return "No university selected", 400

    return render_template('functions.html', university=selected_university)


@app.route('/evaluations/recommendations', methods=['POST', 'GET'])
def calculate_evaluate_recommend():
    # selected_university = session.get('selected_university')
    selected_university = "Obafemi Awolowo University (OAU)"
    uni_id = uni_dict[selected_university]
    index = uni_id - 1
    max_post_utme = universities[index].get("total post utme")

    course = request.args.get('course_name')
    utme_score = request.args.get('utme_score')
    post_utme_score = request.args.get('post_utme_score')

    if not course:
        return jsonify({"error": "course_name parameter is required"}), 400
    if not utme_score:
        return jsonify({"error": "utme_score parameter is required"}), 400
    if post_utme_score:
        post_utme_score = int(post_utme_score)
        if post_utme_score > max_post_utme:
            return jsonify({"error": f"Max post utme score is {max_post_utme}"})
    if not post_utme_score:
        return jsonify({"error": "post_utme_score parameter is required"}), 400

    utme_score = int(utme_score)

    if uni_id in utme_postutme_olevel:
        o_level = request.args.get('grades')
        if o_level:
            o_level_grades = o_level.split(',')
            no_of_grades = grades_needed[uni_id]
            if len(o_level_grades) != no_of_grades:
                return jsonify({"error": f"Please enter exactly {no_of_grades} grades."}), 400
        else:
            return jsonify({"error": "grades parameter is required"}), 400

    # University Instance
    _class_instance = create_class_instance(uni_id)

    courses = list(_class_instance.get_courses().keys())
    if course not in courses:
        return jsonify({
            "message": f"The course '{course}' is not offered at {selected_university}. Please select another course."
        }), 404

    course_aggr = _class_instance.get_course_aggregate(course)

    if uni_id in utme_postutme_olevel:
        stu_aggr = _class_instance.calculate_aggregate(
            utme_score, post_utme_score, o_level)
    elif uni_id in utme_olevel:
        stu_aggr = _class_instance.calculate_aggregate(utme_score, o_level)
    else:
        stu_aggr = _class_instance.calculate_aggregate(
            utme_score, post_utme_score)
    stu_aggr = round(stu_aggr, 2)

    course_faculty = _class_instance.get_faculty(course)

    same_faculty = []
    courses_data = _class_instance.get_courses().items()

    for _course, details in courses_data:
        if course_faculty == details["faculty"]:
            if _course != course:
                same_faculty.append(details["faculty"])

    qualified_to_study = {}

    """create a dictionary that contains all
    the courses a user is qualifies to study"""
    if len(same_faculty) >= 1:
        qualified_to_study = {}
        for _course, course_details in courses_data:
            if course_faculty == course_details["faculty"]:
                aggregate = course_details["aggregate"]
                if aggregate:
                    if stu_aggr >= aggregate:
                        if _course != course:
                            qualified_to_study[_course] = aggregate
    result = {
        "course": course,
        "course aggregate": course_aggr,
        "student's aggregate": stu_aggr,
        "University's name": selected_university,
        "university id": uni_id,
        "faculty": course_faculty,
        "other courses qualified for": qualified_to_study
    }
    return jsonify(result)


@app.route('/post-utme/requirements', methods=['GET'])
def determine_required_post_utme_score():
    # selected_university = session.get('selected_university')
    selected_university = "Obafemi Awolowo University (OAU)"
    uni_id = uni_dict[selected_university]
    index = uni_id - 1

    course = request.args.get('course_name')
    utme_score = request.args.get('utme_score')

    if not course:
        return jsonify({"error": "course_name parameter is required"}), 400
    if not utme_score:
        return jsonify({"error": "utme_score parameter is required"}), 400

    utme_score = int(utme_score)

    if uni_id in utme_postutme_olevel:
        o_level = request.args.get('grades')
        if o_level:
            o_level_grades = o_level.split(',')
            no_of_grades = grades_needed[uni_id]
            if len(o_level_grades) != no_of_grades:
                return jsonify({"error": f"Please enter exactly {no_of_grades} grades."}), 400
        else:
            return jsonify({"error": "grades parameter is required"}), 400

    # University Instance
    _class_instance = create_class_instance(uni_id)
    if course not in _class_instance.get_courses().keys():
        return jsonify({"error": "course not found"})

    post_utme_mark = _class_instance.universities[index]["total post utme"]
    pass_mark = post_utme_mark / 2

    course_aggr = _class_instance.get_course_aggregate(course)

    if uni_id in utme_postutme_olevel:
        required_score = _class_instance.calculate_required_post_utme_score(
            course_aggr, utme_score, o_level)
    elif uni_id in utme_olevel:
        required_score = _class_instance.calculate_required_post_utme(
            course_aggr)
    else:
        required_score = _class_instance.calculate_required_post_utme_score(
            course_aggr, utme_score)

    if required_score is None:
        return jsonify({
            "message": f"Currently not supported at {selected_university}."}), 404

    required_score = int(round(required_score))

    result = {
        "course": course,
        "required score": required_score,
        "post utme mark": post_utme_mark,
        "pass mark": pass_mark,
        "univeristy name": selected_university,
        "university id": uni_id
    }

    return jsonify(result)


@app.route('/aggregates/requirements', methods=['GET'])
def get_required_aggregate():
    selected_university = "University of Nigeria, Nsukka (UNN)"
    uni_id = uni_dict[selected_university]

    course = request.args.get('course_name')

    if not course:
        return jsonify({"error": "course_name parameter is required"}), 400

    # create class instance
    _class_instance = create_class_instance(uni_id)

    course_aggr = _class_instance.get_course_aggregate(course)
    if not course_aggr:
        return jsonify({"error": "course or course aggregate not found"}), 404

    result = {
        "course": course,
        "university name": selected_university,
        "university id": uni_id,
        "course aggregate": course_aggr
    }
    return jsonify(result)


@app.route('/universities/description', methods=['GET'])
def about_university():
    selected_university = "University of Lagos (UNILAG)"
    uni_id = uni_dict[selected_university]

    _class_instance = create_class_instance(uni_id)
    about_uni = _class_instance.about_uni()

    result = {
        "Univerity name": selected_university,
        "university id": uni_id,
        "university description": about_uni
    }

    return jsonify(result)


@app.route('/universities/list/courses', methods=['GET'])
def display_list_of_courses():
    selected_university = "University of Lagos (UNILAG)"
    uni_id = uni_dict[selected_university]

    _class_instance = create_class_instance(uni_id)

    courses = list(_class_instance.get_courses().keys())

    result = {
        "Univerity name": selected_university,
        "university id": uni_id,
        "List of courses": courses
    }

    return jsonify(result)

@app.route('/course/faculty', methods=['GET'])
def get_faculty():
    selected_university = "Obafemi Awolowo University (OAU)"
    uni_id = uni_dict[selected_university]
    course = request.args.get('course_name')

    if not course:
        return jsonify({"error": "course_name parameter is required"}), 400
    
    # create class instance
    _class_instance = create_class_instance(uni_id)
    faculty = _class_instance.get_faculty(course)

    if not faculty:
        return jsonify({"error": "course or faculty not found"}), 404

    result = {
        "university name": selected_university,
        "university id": uni_id,
        "course": course,
        "faculty": faculty,
    }

    return jsonify(result)

@app.route('/universities/faculties/courses', methods=['GET'])
def display_faculties_and_courses():
    selected_university = "Obafemi Awolowo University (OAU)"
    uni_id = uni_dict[selected_university]

    # create class instance
    _class_instance = create_class_instance(uni_id)
    faculties_data = _class_instance.get_faculties_and_courses()


    result = {
        "University name": selected_university,
        "university id": uni_id,
        "faculties and their courses": faculties_data
    }

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
