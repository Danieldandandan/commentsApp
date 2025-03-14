import * as React from "react";
interface DeleteBtnProps {
  onDelete: () => void;
}
const DeleteBtn = ({
  onDelete,
}: DeleteBtnProps & React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <div
      className="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl cursor-pointer"
      onClick={onDelete}
    >
      <svg
        width="16"
        fill="none"
        viewBox="0 0 39 7"
        className="origin-right duration-500 group-hover:rotate-90 stroke-red-500 stroke-2"
      >
        <line stroke-width="4" stroke="red" y2="5" x2="39" y1="5"></line>
        <line
          stroke-width="3"
          stroke="red"
          y2="1.5"
          x2="26.0357"
          y1="1.5"
          x1="12"
        ></line>
      </svg>
      <svg width="16" fill="none" viewBox="0 0 33 39">
        <path
          fill="red"
          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
        ></path>
        <path stroke-width="4" stroke="red" d="M12 6L12 29"></path>
        <path stroke-width="4" stroke="red" d="M21 6V29"></path>
      </svg>
    </div>
  );
};

export default DeleteBtn;
