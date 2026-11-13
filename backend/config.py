"""Application configuration."""
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class Config:
    # Where uploaded files are stored on disk
    RESOURCES_DIR = os.path.join(BASE_DIR, "resources")
    # SQLite database (the "index" of all media)
    DB_PATH = os.path.join(BASE_DIR, "database.db")
    # Max upload size: 200 MB
    MAX_CONTENT_LENGTH = 200 * 1024 * 1024

    IMAGE_EXT = {"png", "jpg", "jpeg", "gif", "webp"}
    VIDEO_EXT = {"mp4", "webm", "mov", "avi", "mkv"}

    # CORS: allow the two React dev servers (and anything in dev)
    CORS_ORIGINS = "*"
