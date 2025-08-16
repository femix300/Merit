from app.utils.password_helper import hash_password, verify_password
from app.utils.jwt_helper import encode_token, decode_token, jwt_required
from app.models.user_model import (create_user, find_user_by_id, find_user_by_email,
                                   mark_email_verified, delete_user as delete_user_model,
                                   find_user_by_username)
from app.utils.email_helper import send_verification_email, send_password_reset_email
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from flask import jsonify
from app import db
from functools import wraps
from bson import ObjectId


def signup_user(db, mail, data):
    required_fields = ["username", "email", "password"]

    for field in required_fields:
        if field not in data or not data[field].strip():
            return {"error": f"'{field}' is required"}, 400
    
    if find_user_by_email(db, data["email"]):
        return {"error": "Email already exists"}, 400
    
    if find_user_by_username(db, data["username"]):
        return {"error": "Username already exists"}, 400

    hashed_pwd = hash_password(data["password"])
    user_id = create_user(db, {
        "username": data["username"],
        "email": data["email"],
        "password_hash": hashed_pwd,
        "verified": False,
        "is_admin": False,
        "profile": {
            "bio": "", "preferences": {},
            "grades": {
                "maths": None,
                "english": None,
                "relevantSubjects": []
            },
            "utmeScore": None,
            "postutmeScore": None
            }
    })
    token = encode_token({"user_id": user_id}, token_type="verify_email", expires_in_minutes=60*24*7) # increased to 7 days for the sake of testing
    send_verification_email(mail, data["email"], token)
    return {"message": "User created, please verify your email"}, 201


def verify_email(db, token):
    payload = decode_token(token, expected_type="verify_email")
    user_id = payload.get("user_id") if payload else None

    if not user_id:
        return {"error": "Invalid or expired token"}, 400
    
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"error": "User not found"}, 404
    
    if user.get("verified", False):
        return {"message": "Email already verified"}, 200

    result = mark_email_verified(db, user_id)
    if result.matched_count == 0:
        return {"error": "Verification failed"}, 500
    
    return {"message": "Email Verified successfully"}, 200


def resend_verification_email(db, mail, email):
    user = db.users.find_one({"email": email})

    if not user:
        return {"error": "User not found"}, 404
    
    if user.get("verified", False):
        return {"message": "Email already verified"}, 200
    
    token = encode_token(
        {"user_id": str(user["_id"])},
        token_type="verify_email",
        expires_in_minutes=60*24*7
        )

    send_verification_email(mail, user["email"], token)

    return {"message": "Verification email resent"}, 200

def login_user(db, data):
    user = find_user_by_email(db, data["email"])
    if not user:
        return {"error": "Email not found"}, 404
    
    if not verify_password(data["password"], user["password_hash"]):
        return {"error": "Password is incorrect"}, 401
    
    if not user.get("verified", False):
        return {"error": "Email not verified"}, 403

    user_id = str(user["_id"])
    accesstoken = encode_token({"user_id": user_id}, token_type="access", expires_in_minutes=60*24*7) # increased to 7 days for the sake of testing
    refreshtoken = encode_token({"user_id": user_id}, token_type="refresh", expires_in_minutes=60*24*7)

    return {
        "access_token": accesstoken,
        "refresh_token": refreshtoken
    }, 200


def refresh_access_token(db, token):
    """
    Validate the refresh token and issue a new access token
    """
    payload = decode_token(token, expected_type="refresh")
    user_id = payload.get("user_id") if payload else None
    if not user_id:
        return {"error": "Invalid or expired refresh token"}, 401

    # confirm if the user still exists
    user = find_user_by_id(db, user_id)
    if not user:
        return {"error": "User not found"}, 404

    new_access = encode_token({"user_id": user_id}, token_type="access", expires_in_minutes=60*24*7) # increased to 7 days for the sake of testing
    return {"access_token": new_access}, 200


def delete_user(db, user_id):
    try:
        result = delete_user_model(db, user_id)
        if result and result.deleted_count == 1:
            return {"success": True}
        else:
            return {"success": False, "error": "User not found"}
    except Exception as e:
        return {"success": False, "error": str(e)}


def request_password_reset(db, mail, email):
    user = find_user_by_email(db, email)
    if not user:
        return {"error": "No account found for that email"}, 404
    
    user_id = str(user["_id"])

    reset_token = encode_token({"user_id": user_id}, token_type="reset", expires_in_minutes=60*24*7) # increased to 7 days for the sake of testing

    send_password_reset_email(mail, email, reset_token)
    return {"message": "password reset email sent"}, 200

def reset_passsword(db, token, new_password):
    payload = decode_token(token, expected_type="reset")
    user_id = payload.get("user_id") if payload else None

    if not user_id:
        return {"error": "Invalid or expired reset token"}, 400
    
    hashed_pwd = hash_password(new_password)
    result = db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"password_hash": hashed_pwd}}
    )

    if result.matched_count == 0:
        return {"error": "User not found"}, 404
    
    return {"message": "Password updated successfully"}, 200

def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(current_user_id, *args, **kwargs):
        user = db.users.find_one({"_id": ObjectId(current_user_id)})

        if not user or not user.get("is_admin", False):
            return jsonify({"erorr": "Admin access required"}), 403
        
        return fn(*args, **kwargs)
    return wrapper
# credentials