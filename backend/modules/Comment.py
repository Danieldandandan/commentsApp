from .Base import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text


class Comment(Base):
    __tablename__ = "comments"
    id: int = Column(Integer, primary_key=True, autoincrement=True)
    author = Column(Text, nullable=False)
    text = Column(Text, nullable=False)
    date = Column(DateTime, nullable=False)
    likes = Column(Integer, default=0)
    image = Column(Text, nullable=True)

    def __init__(self, author, text, date, likes, image):
        self.author = author
        self.text = text
        self.date = date
        self.likes = likes
        self.image = image

    def to_dict(self):
        return {
            "id": self.id,
            "author": self.author,
            "text": self.text,
            "date": self.date,
            "likes": self.likes,
            "image": self.image,
        }
