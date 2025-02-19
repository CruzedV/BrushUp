import { User } from "src/entities/user.entity";

export type addCommentDto = {
  user: User;
  article_id: number;
  text: string;
};

export type updateCommentDto = {
  user: User;
  comment_id: number;
  text: string;
};

export type deleteCommentDto = {
  user: User;
  comment_id: number;
};
