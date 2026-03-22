from flask import Blueprint, request, jsonify
from src.config.mongo import lessons_collection
from src.middleware.auth_middleware import token_required
from src.modules.users.model import User
import uuid
from src.modules.audit.utils import log_action

lessons_bp = Blueprint("lessons", __name__)

@lessons_bp.route("/", methods=["POST"])
@token_required
def add_lesson():
    from flask import request

    user_id = request.user["user_id"]
    user = User.query.get(user_id)

    if user.role != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()

    lesson = {
        "lesson_id": str(uuid.uuid4()),
        "course_id": data.get("course_id"),
        "title": data.get("title"),
        "type": data.get("type"),  # text or video
        "content": data.get("content")
    }

    lessons_collection.insert_one(lesson)
    
    log_action(user_id, "ADD_LESSON")

    return jsonify({"message": "Lesson added"}), 201


@lessons_bp.route("/<course_id>", methods=["GET"])
def get_lessons(course_id):
    lessons = list(lessons_collection.find({"course_id": int(course_id)}, {"_id": 0}))

    return jsonify(lessons)