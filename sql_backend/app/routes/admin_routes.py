from flask import Blueprint, request, jsonify
from app.services.admin_service import make_user_admin
from app.models.user_model import find_user_by_id
from app.services.auth_service import jwt_required  # your custom decorator
from app import db

admin_bp = Blueprint("admin", __name__)


@admin_bp.route("/set-admin", methods=["PUT"])
@jwt_required()  # use parentheses for your custom decorator
def set_admin_route(current_user_id):
    data = request.get_json() or {}
    target_user_id = data.get("user_id")

    if not target_user_id:
        return jsonify({"error": "user_id is required"}), 400

    current_user = find_user_by_id(db, current_user_id)
    if not current_user or not current_user.get("is_admin", False):
        return jsonify({"error": "Admin access required"}), 403

    resp, status = make_user_admin(db, target_user_id)
    return jsonify(resp), status
