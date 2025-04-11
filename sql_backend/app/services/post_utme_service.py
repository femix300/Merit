from flask import jsonify, Response

from app.utils.n_helper import (uni_dict, get_university_instance)


def determine_required_post_utme_score():
    """
    Determines the required post-UTME score for a specific course at a selected
    university.

    This endpoint accepts a GET request with query parameters to calculate the
    required post-UTME score for a student based on their UTME score and, if
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
    uni = _class_instance.get_uni()
    utme_score = int(result["utme_score"])
    course = result["course"]
    o_level = result["o_level"]

    course_aggr = _class_instance.get_course_aggregate(course)

    # for schools who don't use post utme
    if uni.aggr_method == "utme_olevel":
        return jsonify({
            "message": f"This feature is currently"
            f" unavailable for {result['selected_university']}."}), 404

    if uni.aggr_method == "utme_postutme_olevel":
        required_score = _class_instance.calculate_required_post_utme_score(
            course_aggr, utme_score, o_level)
    if uni.aggr_method == "utme_olevel":
        required_score = _class_instance.calculate_required_post_utme(
            course_aggr)
    if uni.aggr_method == "utme_postutme":
        required_score = _class_instance.calculate_required_post_utme_score(
            course_aggr, utme_score)

    if required_score is None:
        return jsonify({
            "message": "Currently not supported"
            f" at {result['selected_university']}."}), 404

    required_score = int(round(required_score))
    # make sure they get to the pass mark even if other grades are enough
    if required_score < uni.post_utme_passmark:
        required_score = uni.post_utme_passmark

    result = {
        "course": course,
        "required score": required_score,
        "post utme mark": uni.total_post_utme,
        "pass mark": uni.post_utme_passmark,
        "univeristy name": result["selected_university"],
        "university id": uni.id
    }

    return jsonify(result)
