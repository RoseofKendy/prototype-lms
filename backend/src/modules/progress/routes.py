from flask import Blueprint, request, jsonify
from src.config.mongo import progress_collection, lessons_collection
from src.middleware.auth_middleware import token_required
from src.modules.audit.utils import log_action

progress_bp = Blueprint("progress", __name__)


# Mark lesson as completed
@progress_bp.route("/complete", methods=["POST"])
@token_required
def complete_lesson():
    data = request.get_json()

    user_id = request.user["user_id"]
    course_id = data.get("course_id")
    lesson_id = data.get("lesson_id")

    progress = progress_collection.find_one({
        "user_id": user_id,
        "course_id": course_id
    })

    if progress:
        if lesson_id not in progress["completed_lessons"]:
            progress_collection.update_one(
                {"_id": progress["_id"]},
                {"$addToSet": {"completed_lessons": lesson_id}}
            )
    else:
        progress_collection.insert_one({
            "user_id": user_id,
            "course_id": course_id,
            "completed_lessons": [lesson_id]
        })
        
    log_action(user_id, "COMPLETE_LESSON")

    return jsonify({"message": "Lesson marked as completed"})

# Get progress for a course
@progress_bp.route("/<course_id>", methods=["GET"])
@token_required
def get_progress(course_id):
    user_id = request.user["user_id"]

    progress = progress_collection.find_one({
        "user_id": user_id,
        "course_id": int(course_id)
    })

    total_lessons = lessons_collection.count_documents({
        "course_id": int(course_id)
    })

    completed = len(progress["completed_lessons"]) if progress else 0

    return jsonify({
        "completed": completed,
        "total": total_lessons,
        "progress": f"{completed}/{total_lessons}"
    })