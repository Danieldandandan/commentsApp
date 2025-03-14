from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
import argparse
import json
from modules import Base, Comment
from dotenv import load_dotenv
import os
from Controller import CommentController
from apis import comment_service
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)
app.register_blueprint(comment_service, url_prefix="/api/v0")
user = os.getenv("PG_USER")
password = os.getenv("PG_PASSWORD")
db_name = os.getenv("PG_HOST")
db_url = f"postgresql://{user}:{password}@{db_name}/bob_yard"
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
db = SQLAlchemy(app, model_class=Base)
app.config["db"] = db


def create_db(app: Flask, db_url: str):
    engine = create_engine(db_url)
    db_exist = database_exists(engine.url)
    if not db_exist:
        create_database(engine.url)
        print(f"Database created at {db_url}")
    with app.app_context():
        db.create_all()
        print("Database tables created.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run the Flask application.")
    create_db(app, db_url)
    cc = CommentController(db.session)
    parser.add_argument(
        "--start-over",
        action="store_true",
        help="Start over by dropping the database and load again.",
    )
    args = parser.parse_args()
    if args.start_over:
        with app.app_context():
            db.drop_all()
            db.create_all()
            cc.add_all_comments()
            print("Database dropped.")
        print("Starting over by dropping the database and loading again.")
        # load_comments()
    app.run()
