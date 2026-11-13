"""Application factory."""
import os

from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from app.database import init_db
from app.routes.posts import posts_bp


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Make sure the storage folder exists
    os.makedirs(app.config["RESOURCES_DIR"], exist_ok=True)

    # Extensions
    CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})

    # Database
    init_db(app.config["DB_PATH"])

    # Blueprints (routes)
    app.register_blueprint(posts_bp)

    @app.get("/")
    def health():
        return jsonify({"status": "ok", "service": "tounch-newssite-backend"})

    return app
