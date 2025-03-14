import httpService from "../http_service";
import { AxiosInstance } from "axios";
import { Comment, Comments } from "./types";

export class CommentService {
  private http = httpService as AxiosInstance;

  async createComment(text: string): Promise<Comment> {
    const newComment = await this.http.post("/comments", { text });
    return newComment.data;
  }

  async editComment(id: number, newText: string): Promise<Comment> {
    const { data: comment } = await this.http.put(`/comments/${id}`, {
      text: newText,
    });

    return comment;
  }

  async deleteComment(id: number): Promise<boolean> {
    return this.http.delete(`/comments/${id}`);
  }

  async getComments(): Promise<Comments> {
    const comments = await this.http.get("/comments");
    return comments.data;
  }
}
