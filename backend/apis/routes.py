from flask import jsonify, request, current_app
from . import comment_service as comment
from typing import List
from Controller import CommentController
import json


@comment.post("/comments")
def add_comment() -> dict:
    db = current_app.config["db"]
    cc = CommentController(db.session)
    data = request.get_json()
    if "text" not in data:
        return {"error": "Text is required"}, 400

    comment = cc.create_comment(
        author="Admin", text=data["text"], image=data.get("image", "")
    )
    return comment.to_dict(), 200


@comment.get("/comments")
def list_comments() -> List[dict]:
    db = current_app.config["db"]
    cc = CommentController(db.session)
    comments = cc.get_all_comments()
    comments_list = [comment.to_dict() for comment in comments]
    return jsonify(comments_list), 200


@comment.put("/comments/<comment_id>")
def edit_comment(comment_id: int):
    db = current_app.config["db"]
    cc = CommentController(db.session)
    data = request.get_json()
    if "text" not in data:
        return {"error": "Text is required"}, 400

    comment = cc.update_comment_by_id(comment_id, text=data["text"])
    if not comment:
        return {"error": "Comment not found"}, 404

    return comment.to_dict(), 200


@comment.delete("/comments/<comment_id>")
def delete_comment(comment_id: int):
    db = current_app.config["db"]
    cc = CommentController(db.session)
    comment = cc.delete_comment_by_id(comment_id)
    if not comment:
        return {"error": "Comment not found"}, 404
    return "", 204
