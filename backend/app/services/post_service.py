"""Business logic for posts. Routes stay thin and call into here."""
import os
import uuid
from datetime import datetime

from flask import current_app
from werkzeug.utils import secure_filename

from app.database import get_db
from app.utils import ext_of, media_type_of, youtube_id


class ServiceError(Exception):
    """Raised for expected validation/not-found errors -> HTTP 4xx."""

    def __init__(self, message, status=400):
        super().__init__(message)
        self.message = message
        self.status = status


# ---------- serialization ----------
def serialize(row):
    data = {
        "id": row["id"],
        "original_name": row["original_name"],
        "media_type": row["media_type"],
        "caption": row["caption"],
        "created_at": row["created_at"],
        "url": row["url"],
        "media_url": None,
    }
    if row["media_type"] in ("image", "video"):
        data["media_url"] = f"/api/media/{row['id']}"
    return data


# ---------- queries ----------
def list_posts():
    conn = get_db()
    rows = conn.execute("SELECT * FROM posts ORDER BY id DESC").fetchall()
    conn.close()
    return [serialize(r) for r in rows]


def get_post(post_id):
    conn = get_db()
    row = conn.execute("SELECT * FROM posts WHERE id = ?", (post_id,)).fetchone()
    conn.close()
    if row is None:
        raise ServiceError("Post not found", 404)
    return serialize(row)


def get_filename(post_id):
    conn = get_db()
    row = conn.execute("SELECT * FROM posts WHERE id = ?", (post_id,)).fetchone()
    conn.close()
    if row is None or not row["filename"]:
        raise ServiceError("Media not found", 404)
    return row["filename"]


# ---------- commands ----------
def _save_file(file):
    ext = ext_of(file.filename)
    mtype = media_type_of(ext)
    if mtype is None:
        raise ServiceError(f"'{ext}' files are not allowed")
    stored_name = f"{uuid.uuid4().hex}.{ext}"
    file.save(os.path.join(current_app.config["RESOURCES_DIR"], stored_name))
    return stored_name, mtype, secure_filename(file.filename)


def _remove_file(filename):
    if not filename:
        return
    path = os.path.join(current_app.config["RESOURCES_DIR"], filename)
    if os.path.exists(path):
        os.remove(path)


def create_post(*, file=None, youtube_url="", caption=""):
    caption = (caption or "").strip()
    youtube_url = (youtube_url or "").strip()

    if youtube_url:
        if youtube_id(youtube_url) is None:
            raise ServiceError("That does not look like a valid YouTube link")
        filename, original_name, media_type, url = "", None, "youtube", youtube_url
    elif file and file.filename:
        filename, media_type, original_name = _save_file(file)
        url = ""
    else:
        raise ServiceError("Provide a file or a YouTube link")

    conn = get_db()
    cur = conn.execute(
        """INSERT INTO posts (filename, original_name, media_type, url, caption, created_at)
           VALUES (?, ?, ?, ?, ?, ?)""",
        (filename, original_name, media_type, url, caption,
         datetime.utcnow().isoformat()),
    )
    conn.commit()
    row = conn.execute("SELECT * FROM posts WHERE id = ?", (cur.lastrowid,)).fetchone()
    conn.close()
    return serialize(row)


def update_post(post_id, *, caption=None, file=None, youtube_url=""):
    conn = get_db()
    row = conn.execute("SELECT * FROM posts WHERE id = ?", (post_id,)).fetchone()
    if row is None:
        conn.close()
        raise ServiceError("Post not found", 404)

    filename = row["filename"]
    media_type = row["media_type"]
    original_name = row["original_name"]
    url = row["url"]
    new_caption = row["caption"] if caption is None else caption
    youtube_url = (youtube_url or "").strip()

    if youtube_url:
        if youtube_id(youtube_url) is None:
            conn.close()
            raise ServiceError("That does not look like a valid YouTube link")
        _remove_file(row["filename"])
        filename, original_name, media_type, url = "", None, "youtube", youtube_url
    elif file and file.filename:
        _remove_file(row["filename"])
        filename, media_type, original_name = _save_file(file)
        url = ""

    conn.execute(
        """UPDATE posts SET filename=?, original_name=?, media_type=?, url=?, caption=?
           WHERE id=?""",
        (filename, original_name, media_type, url, new_caption, post_id),
    )
    conn.commit()
    row = conn.execute("SELECT * FROM posts WHERE id = ?", (post_id,)).fetchone()
    conn.close()
    return serialize(row)


def delete_post(post_id):
    conn = get_db()
    row = conn.execute("SELECT * FROM posts WHERE id = ?", (post_id,)).fetchone()
    if row is None:
        conn.close()
        raise ServiceError("Post not found", 404)
    _remove_file(row["filename"])
    conn.execute("DELETE FROM posts WHERE id = ?", (post_id,))
    conn.commit()
    conn.close()
    return {"status": "deleted", "id": post_id}
