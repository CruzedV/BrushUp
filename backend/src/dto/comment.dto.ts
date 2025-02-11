import { User } from "src/entities/user.entity";

export class addCommentDto {
  user: User;
  postId: number;
  text: string;
}
