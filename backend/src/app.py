from flask import Flask, jsonify
from flask_cors import CORS
from src.config.db import db
from src.modules.auth.routes import auth_bp
from src.modules.courses.routes import courses_bp
from src.modules.lessons.routes import lessons_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://lms_user:password123@localhost/lms_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(courses_bp, url_prefix="/api/courses")
    app.register_blueprint(lessons_bp, url_prefix="/api/lessons")

    @app.route("/")
    def home():
        return jsonify({"message": "LMS API running..."})

    return app