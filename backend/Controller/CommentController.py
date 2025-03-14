from modules import Comment
from sqlalchemy.orm import Session
import json
from datetime import datetime


def get_example_comments():
    with open("comment.json", "r", encoding="utf-8") as file:
        data = json.load(file)
    return data["comments"]


class CommentController:
    def __init__(self, session: Session):
        self.session = session

    def get_comment(self, id: int):
        return self.session.query(Comment).filter_by(id=id).first()

    def add_all_comments(self):
        comments = get_example_comments()
        for comment in comments:
            id = comment["id"]
            user = self.get_comment(id)
            if user:
                self.update_comment_by_id(id, **comment)
                continue
            new_comment = Comment(
                author=comment["author"],
                text=comment["text"],
                date=datetime.strptime(comment["date"], "%Y-%m-%dT%H:%M:%SZ"),
                likes=int(comment["likes"]),
                image=comment["image"],
            )
            self.session.add(new_comment)
        self.session.commit()

    def create_comment(self, author: str, text: str, image: str):
        new_comment = Comment(
            author=author,
            text=text,
            date=datetime.now(),
            likes=0,
            image=image,
        )
        self.session.add(new_comment)
        self.session.commit()
        return new_comment

    def get_all_comments(self):
        return self.session.query(Comment).all()

    def update_comment_by_id(self, id: int, **kwargs):
        comment = self.get_comment(id)
        if comment:
            for key, value in kwargs.items():
                setattr(comment, key, value)
            self.session.commit()
            return comment
        return None

    def delete_comment_by_id(self, id: int):
        comment = self.get_comment(id)
        if comment:
            self.session.delete(comment)
            self.session.commit()
            return comment
        return None
