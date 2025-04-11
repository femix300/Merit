from flask import jsonify, Response

from app.utils.n_helper import (uni_dict, get_university_instance)


def calculate_evaluate_recommend():
    """
    Calculates and evaluates a student's eligibility for a specific course at
    a selected university.

    This endpoint accepts both POST and GET requests with query parameters to
    calculate the student's aggregate score and determine their eligibility for
    a specific course. It also recommends other courses within the same faculty
    for which the student is qualified.

    Query Parameters:
        course_name (str): The name of the course to evaluate.
        utme_score (int): The student's UTME score.
        post_utme_score (int): The student's post-UTME score.
        grades (str): Comma-separated O-level grades (if required).

    Returns:
        JSON response:
            - If any required parameter is missing, returns a 400 status code
            with an error message.
            - If the specified course is not offered at the
            selected university, returns a 404 status code with a message.
            - Otherwise, returns a JSON object containing
            the evaluation results, such as the course name, course aggregate,
            student's aggregate, university name, university ID, faculty, and
            other courses the student is qualified for.
    """
    result = get_university_instance(
        uni_dict, course=True, utme_score=True,
        post_utme_score=True, o_level=True, courses=True, sitting=True)

    if isinstance(result, tuple) and isinstance(result[0], Response):
        return result

    _class_instance = result["class_instance"]
    uni = _class_instance.get_uni()
    courses = _class_instance.get_courses()
    utme_score = int(result["utme_score"])
    course = result["course"]
    uni_id = result["uni_id"]
    post_utme_score = result["post_utme_score"]
    o_level = result["o_level"]
    sitting = result["sitting"]

    if uni.aggr_method == "utme_postutme_olevel":
        if uni.sitting:
            stu_aggr = _class_instance.calculate_aggregate(
                utme_score, post_utme_score, o_level, sitting)
        else:
            stu_aggr = _class_instance.calculate_aggregate(
                utme_score, post_utme_score, o_level)

    if uni.aggr_method == "utme_olevel":
        if uni.sitting:
            stu_aggr = _class_instance.calculate_aggregate(
                utme_score, o_level, sitting)
        else:
            stu_aggr = _class_instance.calculate_aggregate(utme_score, o_level)

    if uni.aggr_method == "utme_postutme":
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
        "university name": result["selected_university"],
        "university id": uni_id,
        "faculty": course_faculty,
        "other courses qualified for": qualified_to_study
    }
    return jsonify(result)
