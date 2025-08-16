from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity
from app.utils.jwt_helper import jwt_required
from bson.objectid import ObjectId
from app.services import auth_service
from app.services.auth_service import admin_required, resend_verification_email
from app import db, mail

auth_bp = Blueprint("auth", __name__)


@auth_bp.record_once
def setup(state):
    mail.init_app(state.app)


@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    return auth_service.signup_user(db, mail, data)


@auth_bp.route("/verify-email")
def verify_email():
    token = request.args.get("token")
    return auth_service.verify_email(db, token)


@auth_bp.route("/resend-verification", methods=["POST"])
def resend_verification():
    data = request.get_json()
    email = data.get("email")
    if not email:
        return {"error": "Email is required"}, 400

    return resend_verification_email(db, mail, email)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"error": "Email or password are required"}, 400

    return auth_service.login_user(db, data)


@auth_bp.route("/refresh", methods=["POST"])
def refresh():
    data = request.get_json() or {}
    refresh_token = data.get("refresh_token")
    if not refresh_token:
        return jsonify({"error": "missing refresh_token"}), 400
    resp, status = auth_service.refresh_access_token(db, refresh_token)
    return jsonify(resp), status


@auth_bp.route("/logout", methods=["POST"])
def logout():
    # for stateless JWTs, server-side logout requires token revocation list
    return jsonify({"message": "Logout handled client-side by deleting tokens"}), 200


@auth_bp.route("/request-password-reset", methods=["POST"])
def request_password_reset_route():
    data = request.get_json() or {}
    email = data.get("email")
    if not email:
        return {"error": "Email is required"}, 400
    return auth_service.request_password_reset(db, mail, email)


@auth_bp.route("/reset-password", methods=["POST"])
def reset_password_route():
    data = request.get_json() or {}
    token = data.get("token")
    new_password = data.get("new_password")

    if not token or not new_password:
        return {"error": "Token and new password are required"}, 400
    return auth_service.reset_passsword(db, token, new_password)


@auth_bp.route("/delete", methods=["DELETE"])
@jwt_required()
def delete_account(user_id):
    res = auth_service.delete_user(db, user_id)
    if res.get("success"):
        return jsonify({"message": "User account deleted successfully"}), 200
    else:
        return jsonify({"error": res.get("error", "Failed to delete user")}), 400



@auth_bp.route("/delete-user/<user_id>", methods=["DELETE"])
@admin_required
def delete_user_by_id(user_id):
    try:
        old = ObjectId(user_id)
    except Exception:
        return jsonify({"error": "Invalid user ID format"}), 400

    result = db.users.delete_one({"_id": old})

    if result.deleted_count == 0:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"message": "User deleted successfully"}), 200


@auth_bp.route("/delete-users-by-email", methods=["DELETE"])
@admin_required
def delete_users_by_email():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    result = db.users.delete_many({"email": email})

    if result.deleted_count == 0:
        return jsonify({"error": "No users found with that email"}), 404

    return jsonify({
        "message": f"{result.deleted_count} user(s) with email {email} deleted successfully"
    }), 200
