from flask import Blueprint
from app.services.evaluation_service import calculate_evaluate_recommend

evaluation_bp = Blueprint('evaluation_bp', __name__)


@evaluation_bp.route('/evaluations/recommendations', methods=['GET', 'POST'])
def calculate_evaluate_recommend_route():
    return calculate_evaluate_recommend()
