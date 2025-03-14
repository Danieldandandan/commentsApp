import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
interface EditableTextProps {
  text: string;
  onTextUpdate: (text: string) => void;
  emptyText?: string;
}
const EditableText = ({
  text,
  onTextUpdate,
  emptyText,
  ...props
}: EditableTextProps & React.HTMLAttributes<HTMLDivElement>) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [localValue, setLocalValue] = useState(text);

  useEffect(() => {
    setLocalValue(text);
  }, [text]);
  return (
    <div {...props}>
      {isEditing ? (
        <TextareaAutosize
          ref={textareaRef}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={() => {
            onTextUpdate(localValue);
            setIsEditing(false);
          }}
          className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
        />
      ) : (
        <p
          className="cursor-pointer hover:bg-blue-50 hover:shadow-lg transition-all duration-400 ease-in-out p-2 rounded-md text-gray-700"
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              textareaRef.current?.focus();
              if (textareaRef.current) {
                const length = textareaRef.current.value.length;
                textareaRef.current.setSelectionRange(length, length);
              }
            }, 0);
          }}
        >
          {text ? text : emptyText ? emptyText : ""}
        </p>
      )}
    </div>
  );
};

export default EditableText;
