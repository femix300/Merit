"""
Install the Google AI Python SDK

$ pip install google-generativeai
"""

import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create the model
generation_config = {
    "temperature": 0.4,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    # safety_settings = Adjust safety settings
    # See https://ai.google.dev/gemini-api/docs/safety-settings
    system_instruction="You are an educational consultant. Your task is to provide the best advice concerning educational decisions \
  and choices. Explain concepts in a way that they are easily understandable. Use examples and analogies that are relatable. Use humor \
  and make the conversation user friendly, educational and interesting. Be formal and respectful. You'd be dealing with Nigerian \
  universities and institutions for now.",
)

history = []

print("Bot: Hello, how can I help you Today?")

while True:

    user_input = input("You: ")

    chat_session = model.start_chat(
        history=history
    )

    response = chat_session.send_message(user_input)

    model_response = response.text
    print("Bot: {}".format(model_response))

    history.append({"role": "user", "parts": [user_input]})
    history.append({"role": "model", "parts": [model_response]})
