from flask import Blueprint

comment_service = Blueprint("comment", __name__)

from . import routes
