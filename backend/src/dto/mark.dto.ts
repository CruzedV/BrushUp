import { User } from "src/entities/user.entity";

export type MarkPostDto = {
  bookmark_id?: number;
  article_id: number;
  user: User;
};
