from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["lms_db"]

lessons_collection = db["lessons"]
progress_collection = db["progress"]
audit_logs_collection = db["audit_logs"]