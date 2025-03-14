import moment from "moment";
import { useMemo, useState } from "react";

import { Comment } from "../../service/Comments";
import EditableText from "../EditableText";
import LikeButton from "../LikeButton";
import DeleteBtn from "../DeleteBtn";

interface CommentListProps {
  comment: Comment;
  onDelete: () => void;
  onEdit: (text: string) => void;
  onCreate: (text: string) => void;
}
const CommentItem = ({ comment, onDelete, onEdit }: CommentListProps) => {
  const fromNow = useMemo(() => {
    const date = moment(comment.date, "ddd, DD MMM YYYY HH:mm:ss Z").format();
    return moment(date).fromNow();
  }, [comment.date]);
  const [localLiked, setLocalLiked] = useState(false);

  return (
    <div className="flex-1 items-start">
      <div className="flex items-center space-x-2 mb-2 w-full items-end">
        <h2 className="text-2xl text-gray-800 ">{comment.author}</h2>
        <p className="text-gray-500 ">{fromNow}</p>
        <div className="ml-auto flex items-center space-x-3 mt-2 text-sm text-gray-500">
          <LikeButton
            onLike={() => {
              setLocalLiked(!localLiked);
              // TODO: update like status in backend
            }}
            liked={localLiked}
            count={comment.likes}
          />
        </div>
        <DeleteBtn
          onDelete={() => {
            onDelete();
          }}
        />
      </div>
      <EditableText
        className="text-gray-700 mb-2"
        text={comment.text}
        onTextUpdate={onEdit}
      />
      {comment.image && (
        <img
          src={comment.image}
          crossOrigin="anonymous"
          className="object-cover max-w-[10rem] max-h-[10rem]"
          onError={(e) => ((e.target as HTMLImageElement).src = "/vite.svg")}
        />
      )}
    </div>
  );
};

export default CommentItem;
