import { User } from "src/entities/user.entity";

export class MarkPostDto {
  bookmark_id?: number;
  article_id: number;
  user: User;
}
