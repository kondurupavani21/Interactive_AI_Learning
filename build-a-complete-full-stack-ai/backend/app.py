import json
import os
from datetime import datetime, timezone

import google.generativeai as genai
from dotenv import load_dotenv
from firebase_admin import credentials, firestore, initialize_app
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": os.getenv("FRONTEND_URL", "*")}})

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

db = None
firebase_error = None


def initialize_firebase():
    global db, firebase_error
    if db:
        return db

    try:
        service_account_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH")
        service_account_json = os.getenv("FIREBASE_SERVICE_ACCOUNT_JSON")

        if service_account_json:
            cred = credentials.Certificate(json.loads(service_account_json))
        elif service_account_path:
            cred = credentials.Certificate(service_account_path)
        else:
            raise RuntimeError("Firebase service account credentials are not configured.")

        initialize_app(cred)
        db = firestore.client()
        return db
    except Exception as exc:
        firebase_error = str(exc)
        return None


def require_json(*fields):
    payload = request.get_json(silent=True) or {}
    missing = [field for field in fields if not payload.get(field)]
    if missing:
        return payload, jsonify({"error": f"Missing required field(s): {', '.join(missing)}"}), 400
    return payload, None, None


def ask_gemini(prompt):
    if not os.getenv("GEMINI_API_KEY"):
        raise RuntimeError("GEMINI_API_KEY is not configured.")
    response = model.generate_content(prompt)
    return response.text.strip()


def fallback_quiz(topic):
    return [
        {
            "question": f"What is the main idea behind {topic}?",
            "options": ["Store and organize data for efficient operations", "Only render graphics", "Replace all databases", "Encrypt passwords"],
            "answer": "Store and organize data for efficient operations",
            "explanation": f"{topic} is studied because it helps organize data and reason about operation costs."
        },
        {
            "question": "What should you compare when choosing a data structure?",
            "options": ["Time and space complexity", "Screen brightness", "File extension", "CSS selector length"],
            "answer": "Time and space complexity",
            "explanation": "Data structure choices are driven by operation costs and memory tradeoffs."
        }
    ]


@app.get("/health")
def health():
    return jsonify({"status": "ok", "firebaseConfigured": initialize_firebase() is not None})


@app.post("/ask-ai")
def ask_ai():
    payload, error, status = require_json("topic", "question")
    if error:
        return error, status

    mode = payload.get("mode", "chat")
    prompt = f"""
You are a friendly data structures and algorithms tutor.
Topic: {payload['topic']}
Mode: {mode}
Student question: {payload['question']}

Give a concise, accurate answer for an interactive learning app.
Use simple language, mention complexity when relevant, and include a tiny example.
"""
    try:
        answer = ask_gemini(prompt)
        return jsonify({"answer": answer})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.post("/generate-quiz")
def generate_quiz():
    payload, error, status = require_json("topic")
    if error:
        return error, status

    topic = payload["topic"]
    count = int(payload.get("count", 5))
    difficulty = payload.get("difficulty", "medium")
    prompt = f"""
Create {count} {difficulty} multiple-choice quiz questions for {topic}.
Return only valid JSON in this exact shape:
[
  {{
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "answer": "Exact option text",
    "explanation": "Why the answer is correct"
  }}
]
Keep answers accurate for data structures and algorithms learners.
"""
    try:
        raw = ask_gemini(prompt)
        cleaned = raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        questions = json.loads(cleaned)
        return jsonify({"questions": questions[:count]})
    except Exception:
        return jsonify({"questions": fallback_quiz(topic)})


@app.post("/save-progress")
def save_progress():
    payload, error, status = require_json("userId", "topicId")
    if error:
        return error, status

    client = initialize_firebase()
    if client is None:
        return jsonify({"error": firebase_error or "Firebase is not configured."}), 500

    user_id = payload["userId"]
    topic_id = payload["topicId"]
    progress_ref = client.collection("users").document(user_id).collection("progress").document(topic_id)
    existing = progress_ref.get().to_dict() or {}
    data = {
        **existing,
        "topicId": topic_id,
        "completed": bool(payload.get("completed", existing.get("completed", False))),
        "notes": payload.get("notes", existing.get("notes", "")),
        "quizScore": payload.get("quizScore", existing.get("quizScore", 0)),
        "updatedAt": datetime.now(timezone.utc).isoformat()
    }
    progress_ref.set(data, merge=True)
    return jsonify({"ok": True, "progress": data})


@app.get("/get-progress")
def get_progress():
    user_id = request.args.get("userId")
    if not user_id:
        return jsonify({"error": "Missing required query parameter: userId"}), 400

    client = initialize_firebase()
    if client is None:
        return jsonify({"error": firebase_error or "Firebase is not configured."}), 500

    documents = client.collection("users").document(user_id).collection("progress").stream()
    progress = {}
    for document in documents:
        item = document.to_dict()
        item["id"] = document.id
        progress[document.id] = item
    return jsonify({"progress": progress})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=os.getenv("FLASK_DEBUG") == "1")
