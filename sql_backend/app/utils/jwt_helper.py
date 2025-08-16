import jwt
from datetime import datetime, timezone, timedelta
from flask import request, jsonify, current_app
from functools import wraps


def encode_token(data, token_type, expires_in_minutes=15):
    """
    Generates a JWT token for any purpose

    Args:
        data(dict): Data to embed in token (e.g. {"user_id: "..."}).
        token_type (str): Type of token ("verify_email", "reset_password", etc.).
        expires_in_minutes (int): Expiry time for the token in minutes.
    
    Returns:
        str: JWT token.
    """
    payload = {
        **data,
        "type": token_type,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=expires_in_minutes),
        "iat": datetime.now(timezone.utc)
    }
    token = jwt.encode(payload, current_app.config["JWT_SECRET_KEY"], algorithm="HS256")
    return token

def decode_token(token, expected_type):
    """
    Decodes and validates a JWT token.

    Args:
        token (str): The JWT token string that's to be decoded
        expected_type (str): Expected token type.
    
    Returns:
        dict | None: Decoded payload if valid, else None.
    """
    try:
        payload = jwt.decode(token, current_app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
        if payload.get("type") != expected_type:
            return None
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidAlgorithmError:
        return None

def jwt_required(_func=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                return jsonify({"error": "Token missing"}), 401
            try:
                token = auth_header.split(" ")[1]
                payload = decode_token(token, expected_type="access")
                if not payload:
                    return jsonify({"error": "Invalid or expired token"}), 401
                
                user_id = payload["user_id"]
                return f(user_id, *args, **kwargs)
            except IndexError:
                return jsonify({"error": "Token format invalid"}), 401
        return decorated

    # if the function is called without parentheses
    if callable(_func):
        return decorator(_func)

    # if it is called with parentheses
    return decorator

# def encode_access_token(user_id):
#     payload = {
#         "type": "access",
#         "exp": datetime.now(timezone.utc) + timedelta(minutes=15),
#         "iat": datetime.now(timezone.utc),
#         "sub": user_id
#     }
#     return jwt.encode(payload, current_app.config["JWT_JWT_"], algorithm="HS256")


# def encode_refresh_token(user_id):
#     payload = {
#         "type": "refresh",
#         "exp": datetime.now(timezone.utc) + timedelta(days=7),
#         "iat": datetime.now(timezone.utc),
#         "sub": user_id
#     }
#     return jwt.encode(payload, current_app.config["JWT_JWT_"])


# def decode_token(token, expected_type=None):
#     try:
#         payload = jwt.decode(
#             token, current_app.config["JWT_JWT_"], algorithms=["HS256"])

#         if expected_type and payload.get("type") != expected_type:
#             return None

#         return payload["sub"]
#     except jwt.ExpiredSignatureError:
#         return None
#     except jwt.InvalidTokenError:
#         return None

# def encode_reset_token(user_id, expires_in_minutes=15):
#     payload = {
#         "type": "rest",
#         "exp": datetime.now(timezone.utc) + timedelta(minutes=expires_in_minutes),
#         "iat": datetime.now(timezone.utc),
#         "sub": user_id
#     }

#     return jwt.encode(payload, current_app.config["JWT_JWT_"], algorithm="HS256")
