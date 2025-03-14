export type Comment = {
  id: number;
  text: string;
  author: string;
  date: string;
  likes: number;
  image: string;
};

export type Comments = Comment[];
