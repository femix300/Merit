from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_mail import Mail
from flask_jwt_extended import JWTManager
from .config import Config
import os

mongo = PyMongo()
db = None
mail = Mail()
jwt = JWTManager()


def create_app():
    app = Flask(__name__, template_folder='../templates',
                static_folder='../static')

    app.config.from_object(Config)

    # Configure CORS to allow http://localhost:5173 and necessary headers/methods
    CORS(app, supports_credentials=True,
         resources={r"/*": {"origins": ["http://localhost:5173"]}},
         allow_headers=["Content-Type", "Authorization", "x-api-key"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

    mongo.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)

    global db
    db = mongo.db

    from app.routes.university_routes import university_bp
    from app.routes.aggregate_routes import aggregate_bp
    from app.routes.chat_routes import chat_bp
    from app.routes.course_routes import course_bp
    from app.routes.evaluation_routes import evaluation_bp
    from app.routes.post_utme_routes import post_utme_bp
    from app.routes.home_routes import home_bp

    from app.routes.auth_routes import auth_bp
    from app.routes.profile_routes import profile_bp
    from app.routes.admin_routes import admin_bp

    app.register_blueprint(university_bp)
    app.register_blueprint(aggregate_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(course_bp)
    app.register_blueprint(evaluation_bp)
    app.register_blueprint(post_utme_bp)
    app.register_blueprint(home_bp)

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(profile_bp, url_prefix="/profile")
    app.register_blueprint(admin_bp, url_prefix="/admin")

    PUBLIC_ENDPOINTS = {
        'auth.verify_email',
        'auth.login',  # avoid api key issues with public endpoints
        'auth.register'
    }
    # Global API KEY middleware

    @app.before_request
    def validate_api_key():
        """
        Validates API keys
        """
        # allow preflight requests
        if request.method == 'OPTIONS':
            return '', 200

        if request.endpoint == 'static':
            # skip static files
            return

        if request.endpoint in PUBLIC_ENDPOINTS:
            return

        api_key = request.headers.get('x-api-key')
        valid_api_key = os.getenv('MERIT_API_KEY')

        if api_key != valid_api_key:
            return jsonify({"error": f"Unauthorized. Invalid or missing API key."}), 401

    return app
