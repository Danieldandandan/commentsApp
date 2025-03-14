import "./App.css";
import { useEffect, useState } from "react";
import CommentList from "./Component/CommentList";
import { CommentService, Comments } from "./service/Comments";
function App() {
  const [comments, setComments] = useState<Comments>([]);
  useEffect(() => {
    const loadComments = async () => {
      const commentService = new CommentService();
      const comments = await commentService.getComments();
      console.log("comments", comments);
      comments.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setComments(comments);
    };
    loadComments();
  }, []);

  const handleCommentDelete = async (id: number) => {
    const commentService = new CommentService();
    await commentService.deleteComment(id);
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };
  const handleCommentCreate = async (text: string) => {
    if (!text || text === "") return;
    const commentService = new CommentService();
    const newComment = await commentService.createComment(text);
    setComments((prev) => [newComment, ...prev]);
  };
  const handleCommentEdit = async (id: number, text: string) => {
    if (!text || text === "") return;
    const commentService = new CommentService();
    const updatedComment = await commentService.editComment(id, text);
    setComments((prev) =>
      prev.map((comment) => (comment.id === id ? updatedComment : comment))
    );
  };

  return (
    <div>
      <h1>Bobyard take home project</h1>
      <CommentList
        comments={comments}
        onDelete={handleCommentDelete}
        onCreate={handleCommentCreate}
        onEdit={handleCommentEdit}
      />
    </div>
  );
}

export default App;
