import { TTag } from "src/types/tags";

export class CreatePostDto {
  userId: number;
  title: string;
  content: string;
  tags: TTag[];
}

export class UpdatePostDto {
  userId: number;
  title: string;
  content: string;
  tags: TTag[];
  articleId: number;
}
