from flask import Blueprint
from app.services.post_utme_service import determine_required_post_utme_score

post_utme_bp = Blueprint('post_utme_bp', __name__)


@post_utme_bp.route('/post-utme/requirements', methods=['GET'])
def determine_required_post_utme_score_route():
    return determine_required_post_utme_score()
