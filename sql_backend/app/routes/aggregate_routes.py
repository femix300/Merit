from flask import Blueprint
from app.services.aggregate_service import get_required_aggregate

# Create a blueprint
aggregate_bp = Blueprint('aggregate_bp', __name__)

# Register the existing route path


@aggregate_bp.route('/aggregates/requirements', methods=['GET'])
def get_required_aggregate_route():
    return get_required_aggregate()
