from n_unilogics.uniben import Uniben
from n_unilogics.unizik import Unizik
from n_unilogics.futa import Futa
from n_unilogics.unn import Unn
from n_unilogics.unilag import Unilag
from n_unilogics.oau import Oau
from n_unilogics.ui import Ui

from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from universities import universities
from models import session as sql_session

from models import (
    Universities,
    About,
    UiCourses,
    UnilagCourses,
    UnnCourses,
    OauCourses,
    AbuCourses,
    UnilorinCourses,
    FutaCourses,
    UnizikCourses,
    UnibenCourses,
    FuoyeCourses
)

# maps university names with their mysql classes
uni_classes = {
    "University of Ibadan": UiCourses,
    "University of Lagos": UnilagCourses,
    "University of Nigeria": UnnCourses,
    "Obafemi Awolowo University": OauCourses,
    "Federal University of Technology Akure": FutaCourses,
    "Nnamdi Azikiwe University": UnizikCourses,
    "University of Benin": UnibenCourses,
}

# maps universities names and id's
uni_dict = {uni['name']: uni['id'] for uni in universities}

# maps university classes with their id's
uni_classes_logics = {
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
    _class = uni_classes_logics[uni_id_str]
    _class_instance = _class(uni_id)
    return _class_instance


app = Flask(__name__)


@app.route('/merit', methods=['GET'])
def use_merit():
    """Home Page"""
    return render_template('index.html')


@app.route('/universities/courses', methods=['GET'])
def get_universities_offering_course():
    """
    Returns a list of universities that offer a specific course.

    This endpoint accepts a GET request with a query parameter `course_name`
    and returns a JSON response containing a list of universities that offer
    the specified course.

    Query Parameters:
        course_name (str): The name of the course to search for.

    Returns:
        JSON response:
            - If the `course_name` parameter is missing, returns a 400 status
              code with an error message.
            - If no universities offer the specified course, returns a 404
              status code with a message.
            - Otherwise, returns a 200 status code with a JSON object containing
              the course name and a list of universities offering the course.
    """
    course = request.args.get('course_name')
    if not course:
        return jsonify({"error": "course_name parameter is required"}), 400

    uni_list = []

    for uni_name, CourseClass in uni_classes.items():

        _course = sql_session.query(CourseClass).filter(
            CourseClass.name == course).first()

        if _course:
            uni_list.append(uni_name)

    if not uni_list:
        return jsonify({"message": f"None of the supported universities offer {course}"}), 404

    result = {
        "course": course,
        "Universities offering the course": uni_list
    }
    return jsonify(result)


@app.route('/select_university', methods=['GET'])
def display_university_selection():
    return render_template('select_university.html')


@app.route('/universities/selected', methods=['GET', 'POST'])
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
    """
    Calculates and evaluates a student's eligibility for a specific course at a selected university.

    This endpoint accepts both POST and GET requests with query parameters to calculate the student's
    aggregate score and determine their eligibility for a specific course. It also recommends other
    courses within the same faculty for which the student is qualified.

    Query Parameters:
        course_name (str): The name of the course to evaluate.
        utme_score (int): The student's UTME score.
        post_utme_score (int): The student's post-UTME score.
        grades (str): Comma-separated O-level grades (if required by the university).

    Returns:
        JSON response:
            - If any required parameter is missing, returns a 400 status code with an error message.
            - If the specified course is not offered at the selected university, returns a 404 status
              code with a message.
            - Otherwise, returns a 200 status code with a JSON object containing the evaluation results,
              including the course name, course aggregate, student's aggregate, university name,
              university ID, faculty, and other courses the student is qualified for.
    """
    # selected_university = session.get('selected_university')
    selected_university = "Obafemi Awolowo University (OAU)"
    uni_id = uni_dict[selected_university]
    _class_instance = create_class_instance(uni_id)

    courses = _class_instance.get_courses()
    uni = _class_instance.get_uni()
    max_post_utme = uni.total_post_utme

    course = request.args.get('course_name')
    utme_score = request.args.get('utme_score')
    post_utme_score = request.args.get('post_utme_score')

    if not course:
        return jsonify({"error": "course_name parameter is required"}), 400

    if not utme_score:
        return jsonify({"error": "utme_score parameter is required"}), 400
    utme_score = int(utme_score)

    if not post_utme_score:
        return jsonify({"error": "post_utme_score parameter is required"}), 400

    if post_utme_score:
        post_utme_score = int(post_utme_score)
        if post_utme_score > max_post_utme:
            return jsonify({"error": f"Max post utme score is {max_post_utme}"})

    if uni.utme_postutme_olevel:
        o_level = request.args.get('grades')
        if o_level:
            o_level_grades = o_level.split(',')
            if len(o_level_grades) != uni.olevel_subjects:
                return jsonify({"error": f"Please enter exactly {uni.olevel_subjects} grades."}), 400
        else:
            return jsonify({"error": "grades parameter is required"}), 400

    course_names = [_course.name for _course in courses]

    if course not in course_names:
        return jsonify({
            "message": f"The course '{course}' is not offered at {selected_university}. Please select another course."
        }), 404

    if uni.utme_postutme_olevel:
        stu_aggr = _class_instance.calculate_aggregate(
            utme_score, post_utme_score, o_level)
    if uni.utme_olevel:
        stu_aggr = _class_instance.calculate_aggregate(utme_score, o_level)
    if uni.utme_postutme:
        stu_aggr = _class_instance.calculate_aggregate(
            utme_score, post_utme_score)

    course_aggr = _class_instance.get_course_aggregate(course)
    course_faculty = _class_instance.get_faculty(course)
    stu_aggr = round(stu_aggr, 2)

    same_faculty = [_course.name for _course in courses if _course.faculty ==
                    course_faculty and _course.name != course]

    qualified_to_study = {}

    if len(same_faculty) >= 1:
        qualified_to_study = {}
        for _course in courses:
            if _course.faculty == course_faculty:
                aggregate = _course.aggregate
                if aggregate:
                    if stu_aggr >= aggregate:
                        if _course.name != course:
                            qualified_to_study[_course.name] = aggregate

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
    """
    Determines the required post-UTME score for a specific course at a selected university.

    This endpoint accepts a GET request with query parameters to calculate the required post-UTME
    score for a student based on their UTME score and, if applicable, O-level grades.

    Query Parameters:
        course_name (str): The name of the course to evaluate.
        utme_score (int): The student's UTME score.
        grades (str): Comma-separated O-level grades (if required by the university).

    Returns:
        JSON response:
            - If any required parameter is missing, returns a 400 status code with an error message.
            - If the specified course is not offered at the selected university, returns a 404 status
              code with a message.
            - If the calculation is not supported at the selected university, returns a 404 status
              code with a message.
            - Otherwise, returns a 200 status code with a JSON object containing the required post-UTME
              score, course name, post-UTME mark, pass mark, university name, and university ID.
    """
    # selected_university = session.get('selected_university')
    selected_university = "Federal University of Technology, Akure (FUTA)"
    uni_id = uni_dict[selected_university]
    _class_instance = create_class_instance(uni_id)
    uni = _class_instance.get_uni()
    courses = _class_instance.get_courses()

    course = request.args.get('course_name')
    utme_score = request.args.get('utme_score')

    if not course:
        return jsonify({"error": "course_name parameter is required"}), 400
    if not utme_score:
        return jsonify({"error": "utme_score parameter is required"}), 400

    course_names = [_course.name for _course in courses]
    if course not in course_names:
        return jsonify({
            "message": f"The course '{course}' is not offered at {selected_university}. Please select another course."
        }), 404

    utme_score = int(utme_score)

    if uni.utme_postutme_olevel:
        o_level = request.args.get('grades')
        if o_level:
            o_level_grades = o_level.split(',')
            if len(o_level_grades) != uni.olevel_subjects:
                return jsonify({"error": f"Please enter exactly {uni.olevel_subjects} grades."}), 400
        else:
            return jsonify({"error": "grades parameter is required"}), 400

    course_aggr = _class_instance.get_course_aggregate(course)

    # for schools who don't use post utme
    if uni.utme_olevel:
        return jsonify({
            "message": f"This feature is currently unavailable for {selected_university}."}), 404

    if uni.utme_postutme_olevel:
        required_score = _class_instance.calculate_required_post_utme_score(
            course_aggr, utme_score, o_level)
    if uni.utme_olevel:
        required_score = _class_instance.calculate_required_post_utme(
            course_aggr)
    if uni.utme_postutme:
        required_score = _class_instance.calculate_required_post_utme_score(
            course_aggr, utme_score)

    if required_score is None:
        return jsonify({
            "message": f"Currently not supported at {selected_university}."}), 404

    required_score = int(round(required_score))
    # make sure they get to the pass mark even if other grades are enough
    if required_score < uni.post_utme_passmark:
        required_score = uni.post_utme_passmark

    result = {
        "course": course,
        "required score": required_score,
        "post utme mark": uni.total_post_utme,
        "pass mark": uni.post_utme_passmark,
        "univeristy name": selected_university,
        "university id": uni.id
    }

    return jsonify(result)


@app.route('/aggregates/requirements', methods=['GET'])
def get_required_aggregate():
    """
    Retrieves the required aggregate score for a specific course at a selected university.

    This endpoint accepts a GET request with a query parameter `course_name` to retrieve the
    required aggregate score for the specified course at the selected university.

    Query Parameters:
        course_name (str): The name of the course to retrieve the aggregate score for.

    Returns:
        JSON response:
            - If the `course_name` parameter is missing, returns a 400 status code with an error message.
            - If the course or its aggregate score is not found, returns a 404 status code with an error message.
            - Otherwise, returns a 200 status code with a JSON object containing the course name, university name,
              university ID, and the required aggregate score for the course.
    """
    selected_university = "University of Nigeria, Nsukka (UNN)"
    uni_id = uni_dict[selected_university]
    _class_instance = create_class_instance(uni_id)

    course = request.args.get('course_name')

    if not course:
        return jsonify({"error": "course_name parameter is required"}), 400

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
    """
    Retrieves detailed information about a selected university.

    This endpoint accepts a GET request and returns detailed information about the selected university,
    including its name, ID, location, establishment year, and description.

    Returns:
        JSON response:
            - A JSON object containing the university's name, ID, location, establishment year,
              and description.
    """
    selected_university = "University of Nigeria, Nsukka (UNN)"
    uni_id = uni_dict[selected_university]
    _class_instance = create_class_instance(uni_id)
    about = _class_instance.about_uni()

    result = {
        "Univerity name": about.name,
        "university id": about.id,
        "location": about.location,
        "established": about.established,
        "description": about.description
    }

    return jsonify(result)


@app.route('/universities/list/courses', methods=['GET'])
def display_list_of_courses():
    """
    Retrieves a list of courses offered by a selected university.

    This endpoint accepts a GET request and returns a list of courses offered by the selected university,
    along with the university's name and ID.

    Returns:
        JSON response:
            - A JSON object containing the university's name, ID, and a list of courses offered by the university.
    """
    selected_university = "University of Lagos (UNILAG)"
    uni_id = uni_dict[selected_university]
    _class_instance = create_class_instance(uni_id)

    courses = _class_instance.get_courses()
    courses = [course.name for course in courses]

    result = {
        "Univerity name": selected_university,
        "university id": uni_id,
        "List of courses": courses
    }

    return jsonify(result)


@app.route('/course/faculty', methods=['GET'])
def get_faculty():
    """
    Retrieves the faculty of a specific course at a selected university.

    This endpoint accepts a GET request with a query parameter `course_name` to retrieve the faculty
    to which the specified course belongs at the selected university.

    Query Parameters:
        course_name (str): The name of the course to retrieve the faculty for.

    Returns:
        JSON response:
            - If the `course_name` parameter is missing, returns a 400 status code with an error message.
            - If the course or its faculty is not found, returns a 404 status code with an error message.
            - Otherwise, returns a 200 status code with a JSON object containing the university name,
              university ID, course name, and the faculty to which the course belongs.
    """
    selected_university = "Obafemi Awolowo University (OAU)"
    uni_id = uni_dict[selected_university]
    _class_instance = create_class_instance(uni_id)

    course = request.args.get('course_name')

    if not course:
        return jsonify({"error": "course_name parameter is required"}), 400

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
    """
    Retrieves a list of faculties and their respective courses offered by a selected university.

    This endpoint accepts a GET request and returns a list of faculties and the courses offered under
    each faculty at the selected university, along with the university's name and ID.

    Returns:
        JSON response:
            - A JSON object containing the university's name, ID, and a dictionary where the keys are
              faculty names and the values are lists of courses offered by each faculty.
    """
    selected_university = "Obafemi Awolowo University (OAU)"
    uni_id = uni_dict[selected_university]
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
