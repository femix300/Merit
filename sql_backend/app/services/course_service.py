from flask import request, jsonify, Response

from app.utils.n_helper import (
    uni_dict, uni_classes, get_university_instance, universities)


def get_faculty():
    """
    Retrieves the faculty of a specific course at a selected university.

    This endpoint accepts a GET request with a query parameter `course_name`
    to retrieve the faculty to which the specified course belongs at the
    selected university.

    Query Parameters:
        course_name (str): The name of the course to retrieve the faculty for.

    Returns:
        JSON response:
            - If the `course_name` parameter is missing, returns a 400 status
            code with an error message.
            - If the course or its faculty is not found, returns a 404 status
            code with an error message.
            - Otherwise, returns a 200 status code with a JSON object
            containing the university name, university ID, course name, and
            the faculty to which the course belongs.
    """
    result = get_university_instance(uni_dict, course=True)

    if isinstance(result, tuple) and isinstance(result[0], Response):
        return result

    _class_instance = result["class_instance"]

    course = request.args.get('course_name').upper()

    if not course:
        return jsonify({"error": "course_name parameter is required"}), 400

    faculty = _class_instance.get_faculty(course)

    if not faculty:
        return jsonify({"error": "course or faculty not found"}), 404

    result = {
        "university name": result["selected_university"],
        "university id": result["uni_id"],
        "course": result["course"],
        "faculty": faculty,
    }
    return jsonify(result)
