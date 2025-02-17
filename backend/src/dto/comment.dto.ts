import { User } from "src/entities/user.entity";

export class addCommentDto {
  user: User;
  article_id: number;
  text: string;
}

export class updateCommentDto {
  user: User;
  comment_id: number;
  text: string;
}

export class deleteCommentDto {
  user: User;
  comment_id: number;
}
