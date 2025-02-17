import { TTag } from "src/types/tags";

export class CreatePostDto {
  user_id: number;
  title: string;
  content: string;
  tags: TTag[];
}

export class UpdatePostDto {
  user_id: number;
  title: string;
  content: string;
  tags: TTag[];
  article_id: number;
}

export class DeletePostDto {
  article_id: number;
  user_id: number;
}
