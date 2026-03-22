from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from src.config.db import db
from src.modules.users.model import User
from src.modules.courses.model import Course
from src.middleware.auth_middleware import token_required
from src.modules.audit.utils import log_action

courses_bp = Blueprint("courses", __name__)

@courses_bp.route("/", methods=["POST", "OPTIONS"])
@cross_origin()
@token_required
def create_course():
    if request.method == "OPTIONS":
        return "", 200

    user = User.query.get(request.user["user_id"])
    if user.role != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()

    course = Course(
        title=data.get("title"),
        description=data.get("description"),
        category=data.get("category"),
        created_by=request.user["user_id"]
    )

    db.session.add(course)
    db.session.commit()

    log_action(request.user["user_id"], "CREATE_COURSE")

    return jsonify({"message": "Course created"}), 201


# --------------------------
# GET ALL COURSES
# --------------------------
@courses_bp.route("/", methods=["GET", "OPTIONS"])
@cross_origin()
def get_courses():
    # ✅ Allow preflight
    if request.method == "OPTIONS":
        return "", 200

    courses = Course.query.all()

    result = []
    for c in courses:
        result.append({
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "category": c.category
        })

    return jsonify(result), 200