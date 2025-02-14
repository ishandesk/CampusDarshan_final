import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app)

@app.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    data = request.json
    topic = data.get('topic', 'Campus History')

    prompt = f"Create a multiple-choice quiz question about {topic} with 4 options and the correct answer."
    response = genai.generate_text(prompt)

    return jsonify({"quiz": response.result})

if __name__ == '__main__':
    app.run(debug=True)
