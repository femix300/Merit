from flask import Blueprint, request, jsonify
from ..utils.jwt_helper import jwt_required
from bson import ObjectId
from ..services.profile_service import (
    get_profile, update_profile,
    delete_account, validate_and_update_academic_info,
    get_all_profiles
)
from app import db

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/", methods=["GET"])
@jwt_required
def profile_get(user_id):
    p = get_profile(db, user_id)
    if not p:
        return jsonify({"error": "user not found"}), 404
    return jsonify(p), 200


@profile_bp.route("/all", methods=["GET"])
@jwt_required()
def all_profiles(user_id):
    # only admiins can access user profiles
    current_user = db.users.find_one({"_id": ObjectId(user_id)})
    if not current_user or not current_user.get("is_admin", False):
        return jsonify({"error": "Admin access required"}), 403

    profiles = get_all_profiles(db)
    return jsonify(profiles), 200


@profile_bp.route("/", methods=["PATCH"])
@jwt_required
def profile_patch(user_id):
    data = request.get_json() or {}
    updated = update_profile(db, user_id, data)
    if not updated:
        return jsonify({"error": "nothing was updated or invalid data"}), 400
    return jsonify(updated), 200


@profile_bp.route("/update-academic-info", methods=["PATCH"])
@jwt_required
def academic_update(user_id):
    data = request.get_json() or {}
    response, status = validate_and_update_academic_info(db, user_id, data)
    return jsonify(response), status


@profile_bp.route("/", methods=["DELETE"])
@jwt_required
def profile_delete(user_id):
    success = delete_account(db, user_id)
    if not success:
        return jsonify({"error": "user not found or could not be deleted"}), 404
    return jsonify({"message": "account deleted"}), 200


@profile_bp.route("/clear-academic-field", methods=["POST"])
@jwt_required
def clear_academic_field(user_id):
    data = request.get_json() or {}
    key = data.get("key")

    if not key:
        return jsonify({"error": "Key is required"}), 400

    # Correct path: field is under profile
    field_path = f"profile.{key}"

    result = db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$unset": {field_path: ""}}
    )

    if result.modified_count == 0:
        return jsonify({"message": f"No academic field '{key}' found"}), 404

    return jsonify({"message": f"Academic field '{key}' cleared"}), 200

