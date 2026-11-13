"""Small helpers shared across the app."""
import re
from flask import current_app

YOUTUBE_RE = re.compile(
    r"(?:youtube\.com/(?:watch\?v=|embed/|shorts/|live/)|youtu\.be/)([A-Za-z0-9_-]{6,})"
)


def ext_of(filename):
    return filename.rsplit(".", 1)[1].lower() if "." in filename else ""


def media_type_of(ext):
    if ext in current_app.config["IMAGE_EXT"]:
        return "image"
    if ext in current_app.config["VIDEO_EXT"]:
        return "video"
    return None


def youtube_id(url):
    """Return the video id for a valid YouTube link, else None."""
    if not url:
        return None
    m = YOUTUBE_RE.search(url)
    return m.group(1) if m else None
