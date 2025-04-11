from flask import render_template, request, jsonify
from app.models.chat_model import history, model


def home():
    """
    Renders the AI chatbot interface.

    This endpoint serves the HTML page where users can interact with the AI
    chatbot. It accepts a GET request to load the chatbot UI.

    Returns:
        HTML page:
            - The chatbot interface allowing users to enter queries and
            receive responses.
    """
    return render_template('chatbot.html')


def chat():
    """
    Handles user input and provides AI chatbot responses.

    This endpoint accepts user messages through a POST request,
    interacts with an AI model, and returns the chatbot's response.
    THe conversation history is stored for reference.

    JSON request body:
        - "message" (str): The user input to be processed by the AI chatbot.

    JSON response:
        - A JSON object containing the AI model's response.
    """
    user_input = request.json.get("message", "")

    chat_session = model.start_chat(
        history=history
    )

    response = chat_session.send_message(user_input)
    model_response = response.text

    # Save the conversation in history
    history.append({"role": "user", "parts": [user_input]})
    history.append({"role": "model", "parts": [model_response]})

    return jsonify({"response": model_response})

    @app.route("/clear-chat", methods=["POST"])
    def clear_chat():
        global history
        history = []  # Clear the stored chat history
        return jsonify({"status": "success"})
