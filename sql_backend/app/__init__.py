from flask import Flask, request, jsonify
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__, template_folder='../templates',
                static_folder='../static')
    CORS(app)

    from app.routes.university_routes import university_bp
    from app.routes.aggregate_routes import aggregate_bp
    from app.routes.chat_routes import chat_bp
    from app.routes.course_routes import course_bp
    from app.routes.evaluation_routes import evaluation_bp
    from app.routes.post_utme_routes import post_utme_bp
    from app.routes.home_routes import home_bp


    app.register_blueprint(university_bp)
    app.register_blueprint(aggregate_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(course_bp)
    app.register_blueprint(evaluation_bp)
    app.register_blueprint(post_utme_bp)
    app.register_blueprint(home_bp)

    # Global API KEY middleware
    @app.before_request
    def validate_api_key():
        """
        Validates API keys
        """
        if request.endpoint == 'static':
            # skip static files
            return
        api_key = request.headers.get('x-api-key')
        valid_api_key = os.getenv('MERIT_API_KEY')

        if api_key != valid_api_key:
            return jsonify({"error": f"Unauthorized. Invalid or missing API key."}), 401

        
    return app
