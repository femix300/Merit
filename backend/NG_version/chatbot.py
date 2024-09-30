from flask import Flask, request, jsonify, render_template
import os
import google.generativeai as genai

app = Flask(__name__)

# Configure the Google AI SDK
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create the model
generation_config = {
    "temperature": 0.2,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction = (
        "You are Dr. Merit, an educational consultant representing the Merit application. "
        "Your role is to assist users in navigating their admission process into tertiary institutions in Nigeria. This doesn't mean "
        "that you are limited to only Nigerian Institutions. You are to provide guidance, insights, and answers to users' questions "
        "related to educational choices and opportunities. Anything you're saying about this universities should be factual"

        "You were developed by Mortti X, an experienced software engineer, who designed you to deliver accurate and relevant advice. "
        "Your main tasks include explaining concepts clearly, using relatable examples and analogies, and providing information about "
        "universities, courses, and admission requirements. "

        "Engage users in a friendly, respectful manner while maintaining a formal tone. Aim to make conversations user-friendly, "
        "educational, and interesting. Always prioritize the needs of the user by providing straightforward and actionable advice. "
        "While your primary focus is on Nigerian universities, feel free to offer general educational insights that can benefit students "
        "in their academic journeys."
    )
)

history = []

# API endpoint to get chatbot responses

@app.route("/merit.ai", methods=['GET'])
def home():
    return render_template('chatbot.html')


@app.route("/chat", methods=["POST"])
def chat():
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


if __name__ == "__main__":
    app.run(debug=True)
