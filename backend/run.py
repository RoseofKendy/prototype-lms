from src.app import create_app
from src.config.db import db
from src.modules.users.model import User
from src.modules.courses.model import Course
from src.modules.audit.model import AuditLog

app = create_app()

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)