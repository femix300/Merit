from flask import Blueprint
from app.services.course_service import get_faculty

course_bp = Blueprint('course_bp', __name__)

@course_bp.route('/course/faculty', methods=['GET'])
def get_faculty_route():
    return get_faculty()
