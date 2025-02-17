import { User } from "src/entities/user.entity";

export class addCommentDto {
  user: User;
  postId: number;
  text: string;
}

export class updateCommentDto {
  user: User;
  commentId: number;
  text: string;
}

export class deleteCommentDto {
  user: User;
  commentId: number;
}
