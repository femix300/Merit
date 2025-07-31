from flask import Blueprint
from app.services.university_service import (
    get_universities_offering_course,
    about_university,
    display_list_of_courses,
    display_faculties_and_courses,
    list_universities,
    get_aggregate_requirements,
    get_all_universities_and_courses
)

university_bp = Blueprint('university_bp', __name__)

@university_bp.route('/universities/courses', methods=['GET'])
def universities_offering_course_route():
    return get_universities_offering_course()

@university_bp.route('/universities/description', methods=['GET'])
def about_university_route():
    return about_university()

@university_bp.route('/universities/list/courses', methods=['GET'])
def display_list_of_courses_route():
    return display_list_of_courses()

@university_bp.route('/universities/faculties/courses', methods=['GET'])
def display_faculty_and_courses_route():
    return display_faculties_and_courses()

@university_bp.route("/universities/list")
def list_universities_route():
    return list_universities()

@university_bp.route("/universities/aggregate-requirements", methods=['GET'])
def get_aggregate_requirements_route():
    return get_aggregate_requirements()

@university_bp.route("/all/universities/courses", methods=['GET'])
def get_all_universities_with_courses():
    return get_all_universities_and_courses()
