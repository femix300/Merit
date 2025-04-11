from flask import Flask, render_template, request, jsonify, Response
from app.models.models import session as sql_session
from app.models.new_merit import uni_classes
from app.models.models import Universities

from app.utils.n_helper import (
    uni_dict, uni_classes, get_university_instance, universities)


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

    for CourseClass in uni_classes.values():

        _course = sql_session.query(CourseClass).filter(
            CourseClass.name == course).first()

        if _course:
            for uni in universities:
                if uni.id == _course.university_id:
                    uni_list.append(uni.name)

    if not uni_list:
        return jsonify({"message": "None of the supported"
                        f" universities offer {course}"}), 404

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
    about = _class_instance.about_uni()
    if about:

        result = {
            "Univerity name": about.name,
            "university id": about.id,
            "location": about.location,
            "established": about.established,
            "university description": about.description
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

    courses = _class_instance.get_courses()
    courses = [course.name for course in courses]
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
    uni_list = []

    for uni in universities:
        if uni.uni_class:
            uni_list.append(uni.name)

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

    for CourseClass in uni_classes.values():

        courses = sql_session.query(CourseClass, Universities.name).join(
            Universities, CourseClass.university_id == Universities.id).all()

        if courses:
            for course, university_name in courses:
                course_name = course.name
                university_info = {
                    "university_name": university_name,
                    "university_id": course.university_id
                }

                if course_name not in courses_with_universities:
                    courses_with_universities[course_name] = []
                courses_with_universities[course_name].append(university_info)

    if not courses_with_universities:
        return jsonify({"message": "No courses or universities found"}), 404

    result = {
        "courses": courses_with_universities
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
