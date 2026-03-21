from flask import Flask, jsonify
from flask_cors import CORS
from src.config.db import db

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://lms_user:password123@localhost/lms_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    @app.route("/")
    def home():
        return jsonify({"message": "LMS API running..."})

    return app