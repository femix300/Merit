from flask import Blueprint
from app.services.chat_service import home, chat

# Create a blueprint
chat_bp = Blueprint('chat_bp', __name__)

# Register the endpoints


@chat_bp.route("/merit.ai", methods=['GET'])
def chatbot_ui():
    return home()


@chat_bp.route("/chat", methods=["POST"])
def chatbot_interaction():
    return chat()
