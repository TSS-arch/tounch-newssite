"""Thin SQLite data-access layer (connection + schema)."""
import sqlite3
from flask import current_app


def get_db():
    conn = sqlite3.connect(current_app.config["DB_PATH"])
    conn.row_factory = sqlite3.Row
    return conn


def init_db(db_path):
    conn = sqlite3.connect(db_path)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS posts (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            filename      TEXT,              -- stored filename in resources/ (empty for youtube)
            original_name TEXT,              -- user's original filename
            media_type    TEXT NOT NULL,     -- 'image' | 'video' | 'youtube'
            url           TEXT,              -- youtube link (empty for file posts)
            caption       TEXT,
            created_at    TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()
