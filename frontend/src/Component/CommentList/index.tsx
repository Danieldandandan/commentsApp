import { Comments } from "../../service/Comments";
import CommentItem from "../Comment";
import AddComment from "../AddComment";
interface CommentListProps {
  comments: Comments;
  onDelete: (id: number) => void;
  onCreate: (text: string) => void;
  onEdit: (id: number, text: string) => void;
}
const CommentList = ({
  comments = [],
  onDelete,
  onCreate,
  onEdit,
}: CommentListProps) => {
  return (
    <div className="mt-4">
      <AddComment onCreate={onCreate} />
      {comments.map((comment) => (
        <div
          key={`comment-${comment.id}`}
          className="space-x-4 border-b pb-4 last:border-b-0"
        >
          <CommentItem
            comment={comment}
            key={comment.id}
            onDelete={() => onDelete(comment.id)}
            onEdit={(text) => onEdit(comment.id, text)}
            onCreate={onCreate}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
