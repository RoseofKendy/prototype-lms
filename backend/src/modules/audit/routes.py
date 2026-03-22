from flask import Blueprint, jsonify, request
from src.config.mongo import audit_logs_collection
from src.middleware.auth_middleware import token_required
from src.modules.users.model import User
import pytz

audit_bp = Blueprint("audit", __name__)

@audit_bp.route("/", methods=["GET"])
@token_required
def get_logs():
    user = User.query.get(request.user["user_id"])

    # 🔒 Admin only
    if user.role != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    logs = list(audit_logs_collection.find())

    nairobi_tz = pytz.timezone("Africa/Nairobi")

    result = []

    for log in logs:
        # Convert timestamp to Nairobi time
        local_time = log["timestamp"].replace(tzinfo=pytz.utc).astimezone(nairobi_tz)

        result.append({
            "user_id": log["user_id"],
            "action": log["action"],
            "timestamp": local_time.strftime("%Y-%m-%d %H:%M:%S")
        })

    return jsonify(result)