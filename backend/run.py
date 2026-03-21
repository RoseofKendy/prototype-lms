from src.app import create_app
from src.config.db import db
from src.modules.users.model import User

app = create_app()

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)