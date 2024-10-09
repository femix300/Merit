from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from universities import universities
from flask_cors import CORS
from chat_model import history, model
from helper import uni_dict, not_support_post_utme, utme_olevel, utme_postutme, utme_postutme_olevel, grades_needed, create_class_instance



app = Flask(__name__)

# Enable CORS for all routes
CORS(app)



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

    selected_university = request.args.get('university_name')
    if not selected_university:
        return jsonify({"error": "university_name parameter is missing"}), 400

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

    if uni_id in utme_postutme_olevel or uni_id in utme_olevel:
        o_level = request.args.get('grades')
        if o_level:
            o_level_grades = o_level.split(',')
            if grades_needed[uni_id] == 4: # tempoary
                o_level_grades.pop()
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
        "university name": selected_university,
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

    selected_university = request.args.get('university_name')
    if not selected_university:
        return jsonify({"error": "university_name parameter is missing"}), 400

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

    if uni_id in not_support_post_utme:
        return jsonify({
            "message": f"This feature is currently unavailable for {selected_university}."}), 404

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
    selected_university = request.args.get('university_name')
    if not selected_university:
        return jsonify({"error": "university_name parameter is missing"}), 400
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
    """
    Retrieves detailed information about a selected university.

    This endpoint accepts a GET request and returns detailed information about the selected university,
    including its name, ID, location, establishment year, and description.

    Returns:
        JSON response:
            - A JSON object containing the university's name, ID, location, establishment year,
              and description.
    """
    # selected_university = "Obafemi Awolowo University (OAU)"
    selected_university = request.args.get('university_name')
    if not selected_university:
        return jsonify({"error": "university_name parameter is missing"}), 400

    uni_id = uni_dict[selected_university]

    _class_instance = create_class_instance(uni_id)
    about_uni = _class_instance.about_uni()

    if about_uni:

        result = {
            "Univerity name": selected_university,
            "university id": uni_id,
            "location": about_uni["location"],
            "established": about_uni["established"],
            "university description": about_uni["description"]
        }

        return jsonify(result)
    
    return None


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
    # selected_university = "University of Lagos (UNILAG)"
    selected_university = request.args.get('university_name')
    if not selected_university:
        return jsonify({"error": "university_name parameter is missing"}), 400

    uni_id = uni_dict[selected_university]

    _class_instance = create_class_instance(uni_id)

    courses = list(_class_instance.get_courses().keys())
    courses = sorted(courses)

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
    # selected_university = "Obafemi Awolowo University (OAU)"
    selected_university = request.args.get('university_name')
    if not selected_university:
        return jsonify({"error": "university_name parameter is missing"}), 400

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
    """
    Retrieves a list of faculties and their respective courses offered by a selected university.

    This endpoint accepts a GET request and returns a list of faculties and the courses offered under
    each faculty at the selected university, along with the university's name and ID.

    Returns:
        JSON response:
            - A JSON object containing the university's name, ID, and a dictionary where the keys are
              faculty names and the values are lists of courses offered by each faculty.
    """
    # selected_university = "University of Ibadan (UI)"
    selected_university = request.args.get('university_name')

    if not selected_university:
        return jsonify({"error": "university_name parameter is missing"}), 400

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


@app.route("/universities/list")
def list_universities():
    """
    Retrieves the list of supported universities.

    This endpoint returns a list of universities currently supported by the application, filtered to 
    include only those with available courses.

    Returns:
        JSON response:
            - A JSON object containing a list of university names that offer courses.
    """
    uni_list = []
    for uni in universities:
        if uni.get("courses"):
            uni_name = uni.get("name")
            if uni_name:
                uni_list.append(uni_name)

    uni_list.sort()

    result = {
        "Supported Universities": uni_list
    }

    return jsonify(result)


@app.route("/all/universities/courses", methods=['GET'])
def get_all_universities_and_courses():
    """
    Returns a JSON object with all courses offered by all universities.

    For each course offered by a university, it lists the university name and ID.

    Returns:
        JSON response:
            - If no courses are available, returns a 404 status code with a message.
            - Otherwise, returns a 200 status code with a JSON object containing
              all courses and the universities offering them.
    """
    courses_with_universities = {}

    for uni in universities:
        if uni["courses"]:
            for course_name in uni["courses"].keys():
                university_info = {
                    "university_name": uni["name"],
                    "university_id": uni["id"]
                }
                # If the course is not already in the dictionary, add it
                if course_name not in courses_with_universities:
                    courses_with_universities[course_name] = []
                # Append the university info to the list for the course
                courses_with_universities[course_name].append(university_info)

    if not courses_with_universities:
        return jsonify({"message": "No courses available across the universities."}), 404

    result = {
        "courses": courses_with_universities
    }
    
    return jsonify(result)


# AI chatbot
@app.route("/merit.ai", methods=['GET'])
def home():
    """
    Renders the AI chatbot interface.

    This endpoint serves the HTML page where users can interact with the AI chatbot. 
    It accepts a GET request to load the chatbot UI.

    Returns:
        HTML page:
            - The chatbot interface allowing users to enter queries and receive responses.
    """
    return render_template('chatbot.html')


@app.route("/chat", methods=["POST"])
def chat():
    """
    Handles user input and provides AI chatbot responses.

    This endpoint accepts user messages through a POST request, interacts with an AI model, 
    and returns the chatbot's response. The conversation history is stored for reference.

    Request:
        JSON request body:
            - "message" (str): The user input to be processed by the AI chatbot.

    Returns:
        JSON response:
            - A JSON object containing the AI model's response to the user's message.
    """
    user_input = request.json.get("message", "")

    chat_session = model.start_chat(
        history=history
    )

    response = chat_session.send_message(user_input)
    model_response = response.text

    # Save the conversation in history
    history.append({"role": "user", "parts": [user_input]})
    history.append({"role": "model", "parts": [model_response]})

    return jsonify({"response": model_response})


if __name__ == '__main__':
    app.run(debug=True)
