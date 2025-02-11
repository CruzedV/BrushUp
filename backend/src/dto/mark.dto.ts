import { User } from "src/entities/user.entity";

export class MarkPostDto {
  bookmarkId?: number;
  articleId: number;
  user: User;
}
