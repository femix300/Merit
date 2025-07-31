from flask import jsonify, Response
from app.models.universities import universities
from app.models.chat_model import history, model

from app.utils.helper import (
    uni_dict,
    not_support_post_utme,
    utme_olevel,
    utme_postutme_olevel,
    get_university_instance
)

def determine_required_post_utme_score():
    """
    Determines the required post-UTME score for a specific course at a selected
    university.

    This endpoint accepts a GET request with query parameters to calculate the
    required post-UTME score for a student based on their pUTME score and, if
    applicable, O-level grades.

    Query Parameters:
        course_name (str): The name of the course to evaluate.
        utme_score (int): The student's UTME score.
        grades (str): Comma-separated O-level grades (if required).

    Returns:
        JSON response:
            - If any required parameter is missing, returns a 400 status code
            with an error message.
            - If the specified course is not offered at the selected
            university, returns a 404 status code with a message.
            - If the calculation is not supported at the selected university,
            returns a 404 status code with a message.
            - Otherwise, returns a with a JSON object containing
            the required post-UTME score, course name, post-UTME mark,
            pass mark, university name, and university ID.
    """
    result = get_university_instance(
        uni_dict, course=True, utme_score=True, o_level=True, courses=True)

    if isinstance(result, tuple) and isinstance(result[0], Response):
        return result

    _class_instance = result["class_instance"]
    utme_score = int(result["utme_score"])
    course = result["course"]
    uni_id = result["uni_id"]
    o_level = result["o_level"]

    index = uni_id - 1

    post_utme_mark = _class_instance.universities[index]["total post utme"]

    course_aggr = _class_instance.get_course_aggregate(course)

    if uni_id in not_support_post_utme:
        return jsonify({
            "message": "This feature is currently unavailable"
            f"for {result['selected_university']}."}), 404

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
            "message": "Currently not supported"
            f"at {result['selected_university']}."}), 404

    required_score = int(round(required_score))
    postutme_passmark = _class_instance.get_aggregate_docs()[
        "postutme_passmark"]
    if required_score < postutme_passmark:
        required_score = postutme_passmark

    result = {
        "course": course,
        "required score": required_score,
        "post utme mark": post_utme_mark,
        "postutme_passmark": postutme_passmark,
        "univeristy name": result["selected_university"],
        "university id": uni_id
    }
    return jsonify(result)
