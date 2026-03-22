from flask import Flask, app, jsonify, request
from flask_cors import CORS
from src.config.db import db
from src.modules.auth.routes import auth_bp
from src.modules.courses.routes import courses_bp
from src.modules.lessons.routes import lessons_bp
from src.modules.progress.routes import progress_bp
from src.modules.audit.routes import audit_bp

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://lms_user:password123@postgres/lms_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(courses_bp, url_prefix="/api/courses")
    app.register_blueprint(lessons_bp, url_prefix="/api/lessons")
    app.register_blueprint(progress_bp, url_prefix="/api/progress")
    app.register_blueprint(audit_bp, url_prefix="/api/audit")

    @app.route("/", methods=["GET", "OPTIONS"])
    def api_root():
        if request.method == "OPTIONS":
            return "", 200
        return jsonify({"message": "API is running"}), 200
    
    return app