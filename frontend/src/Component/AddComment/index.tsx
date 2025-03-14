import * as React from "react";
import EditableText from "../EditableText";
interface AddCommentProps {
  onCreate: (text: string) => void;
}
const AddComment = ({
  onCreate,
}: AddCommentProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div>
      <EditableText
        text=""
        onTextUpdate={(text) => {
          if (text) {
            onCreate(text);
          }
        }}
        emptyText="Write your comment here... (p.s: after finish click outside to save)"
      />
    </div>
  );
};

export default AddComment;
