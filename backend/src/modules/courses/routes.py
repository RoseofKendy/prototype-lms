from flask import Blueprint, request, jsonify
from src.config.db import db
from src.modules.users.model import User
from src.modules.courses.model import Course
from src.middleware.auth_middleware import token_required

courses_bp = Blueprint("courses", __name__)

# Create course (Admin only)
@courses_bp.route("/", methods=["POST"])
@token_required
def create_course():
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

    return jsonify({"message": "Course created"}), 201


# Get all courses
@courses_bp.route("/", methods=["GET"])
def get_courses():
    courses = Course.query.all()

    result = []
    for c in courses:
        result.append({
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "category": c.category
        })

    return jsonify(result)