from flask import request, jsonify, Response
from app.models.universities import universities

from app.utils.helper import (
    uni_dict,
    get_university_instance
)

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
            - Otherwise, returns a JSON object containing
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

def about_university():
    """
    Retrieves detailed information about a selected university.

    This endpoint accepts a GET request and returns detailed information
    about the selected university, including its name, ID, location,
    establishment year, and description.

    Returns:
        JSON response:
            - A JSON object containing the university's name, ID, location,
            establishment year, and description.
    """
    result = get_university_instance(uni_dict)

    if isinstance(result, tuple) and isinstance(result[0], Response):
        return result

    _class_instance = result["class_instance"]
    about_uni = _class_instance.about_uni()

    if about_uni:

        result = {
            "Univerity name": result["selected_university"],
            "university id": result["uni_id"],
            "location": about_uni["location"],
            "established": about_uni["established"],
            "university description": about_uni["description"]
        }

        return jsonify(result)

    return None

def display_list_of_courses():
    """
    Retrieves a list of courses offered by a selected university.

    This endpoint accepts a GET request and returns a list of courses offered
    by the selected university, along with the university's name and ID.

    Returns:
        JSON response:
            - A JSON object containing the university's name, ID, and a list
            of courses offered by the university.
    """
    result = get_university_instance(uni_dict)

    if isinstance(result, tuple) and isinstance(result[0], Response):
        return result

    _class_instance = result["class_instance"]

    courses = list(_class_instance.get_courses().keys())
    courses = sorted(courses)

    result = {
        "Univerity name": result["selected_university"],
        "university id": result["uni_id"],
        "List of courses": courses
    }

    return jsonify(result)

def display_faculties_and_courses():
    """
    Retrieves a list of faculties and their respective courses offered by a
    selected university.

    This endpoint accepts a GET request and returns a list of faculties and
    the courses offered under each faculty at the selected university, along
    with the university's name and ID.

    Returns:
        JSON response:
            - A JSON object containing the university's name, ID, and a
            dictionary where the keys are faculty names and the values are
            lists of courses offered by each faculty.
    """
    result = get_university_instance(uni_dict)

    if isinstance(result, tuple) and isinstance(result[0], Response):
        return result

    _class_instance = result["class_instance"]
    faculties_data = _class_instance.get_faculties_and_courses()

    result = {
        "University name": result["selected_university"],
        "university id": result["uni_id"],
        "faculties and their courses": faculties_data
    }

    return jsonify(result)

def list_universities():
    """
    Retrieves the list of supported universities.

    This endpoint returns a list of universities currently
    supported by the application, filtered to include only those
    with available courses.

    Returns:
        JSON response:
            - A JSON object containing a list of university names
            that offer courses.
    """
    uni_list = sorted([uni.get("name") for uni in universities if uni.get(
        "courses") and uni.get("name")])

    uni_list.sort()

    result = {
        "Supported Universities": uni_list
    }

    return jsonify(result)

def get_aggregate_requirements():
    """
    Retrieve aggregate requirements for universities.

    This endpoint fetches and returns the aggregate requirements for
    a specific university.

    Returns:
        Response: A JSON response containing the aggregate requirements.
        If the requirements are not available, it returns None.
    """
    result = get_university_instance(uni_dict)

    if isinstance(result, tuple) and isinstance(result[0], Response):
        return result

    _class_instance = result["class_instance"]

    requirment_dict = _class_instance.get_aggregate_docs()

    if not requirment_dict:
        return None
    result = {
        "aggregate requirements": requirment_dict
    }
    return jsonify(result)

def get_all_universities_and_courses():
    """
    Returns a list of all courses along with the universities that offer them.

    This endpoint accepts a GET request and returns a JSON response containing
    each course and a list of universities (with names and IDs) that offer the
    course.

    Returns:
        JSON response:
            - If no universities or courses are found, returns a 404 status
              code with a message.
            - Otherwise, returns a 200 status code with a JSON object
              containing each course and the universities offering it.
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
        return jsonify(
            {"message": "No courses available across the universities."}), 404

    result = {
        "courses": courses_with_universities
    }

    return jsonify(result)
