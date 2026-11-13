"""HTTP routes for posts. Thin controllers that delegate to the service layer."""
from flask import Blueprint, request, jsonify, send_from_directory, current_app

from app.services import post_service
from app.services.post_service import ServiceError

posts_bp = Blueprint("posts", __name__, url_prefix="/api")


@posts_bp.errorhandler(ServiceError)
def handle_service_error(err):
    return jsonify({"error": err.message}), err.status


@posts_bp.get("/posts")
def list_posts():
    return jsonify(post_service.list_posts())


@posts_bp.get("/posts/<int:post_id>")
def get_post(post_id):
    return jsonify(post_service.get_post(post_id))


@posts_bp.post("/posts")
def create_post():
    data = post_service.create_post(
        file=request.files.get("file"),
        youtube_url=request.form.get("youtube_url", ""),
        caption=request.form.get("caption", ""),
    )
    return jsonify(data), 201


@posts_bp.put("/posts/<int:post_id>")
def update_post(post_id):
    if request.form or request.files:
        caption = request.form.get("caption")
        youtube_url = request.form.get("youtube_url", "")
        file = request.files.get("file")
    else:
        body = request.get_json(silent=True) or {}
        caption = body.get("caption")
        youtube_url = body.get("youtube_url", "")
        file = None

    data = post_service.update_post(
        post_id, caption=caption, youtube_url=youtube_url, file=file
    )
    return jsonify(data)


@posts_bp.delete("/posts/<int:post_id>")
def delete_post(post_id):
    return jsonify(post_service.delete_post(post_id))


@posts_bp.get("/media/<int:post_id>")
def serve_media(post_id):
    filename = post_service.get_filename(post_id)
    return send_from_directory(current_app.config["RESOURCES_DIR"], filename)
