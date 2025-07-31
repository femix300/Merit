from flask import jsonify, Response
from app.utils.helper import (
    uni_dict,
    get_university_instance
)

def get_required_aggregate():
    """
    Retrieves the required aggregate score for a specific course at a selected
    university.

    This endpoint accepts a GET request with a query parameter `course_name` to
    retrieve the required aggregate score for the specified course at the
    selected university.

    Query Parameters:
        course_name (str): The name of the course to retrieve the aggregate
        score for.

    Returns:
        JSON response:
            - If the `course_name` parameter is missing, returns a 400 status
            code with an error message.
            - If the course or its aggregate score is not found, returns a 404
            status code with an error message.
            - Otherwise, returns a  with a JSON object containing
            the course name, university name, university ID, and the required
            aggregate score for the course.
    """
    result = get_university_instance(uni_dict, course=True)

    if isinstance(result, tuple) and isinstance(result[0], Response):
        return result

    _class_instance = result["class_instance"]

    course_aggr = _class_instance.get_course_aggregate(result["course"])
    if not course_aggr:
        return jsonify({"error": "course or course aggregate not found"}), 404

    result = {
        "course": result["course"],
        "university name": result["selected_university"],
        "university id": result["uni_id"],
        "course aggregate": course_aggr
    }
    return jsonify(result)
