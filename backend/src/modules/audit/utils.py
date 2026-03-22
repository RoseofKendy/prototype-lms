from src.config.db import db
from src.modules.audit.model import AuditLog
from src.config.mongo import audit_logs_collection
from datetime import datetime

def log_action(user_id, action):
    audit_logs_collection.insert_one({
        "user_id": user_id,
        "action": action,
        "timestamp": datetime.utcnow()
    })