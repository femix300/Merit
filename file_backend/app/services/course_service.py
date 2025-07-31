from flask import Flask, render_template, request, jsonify, Response
from app.models.universities import universities
from flask_cors import CORS
from app.models.chat_model import history, model

from app.utils.helper import (
    uni_dict,
    get_university_instance
)

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
    # selected_university = "Obafemi Awolowo University (OAU)"
    result = get_university_instance(uni_dict, course=True)

    if isinstance(result, tuple) and isinstance(result[0], Response):
        return result

    _class_instance = result["class_instance"]
    faculty = _class_instance.get_faculty(result["course"])

    if not faculty:
        return jsonify({"error": "course or faculty not found"}), 404

    result = {
        "university name": result["selected_university"],
        "university id": result["uni_id"],
        "course": result["course"],
        "faculty": faculty,
    }

    return jsonify(result)