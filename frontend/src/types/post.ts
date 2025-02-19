import { TPostUser } from "@shared/types/user";
import { TBookmark } from "./bookmark";
import { TComment } from "./comment";

export type TPost = {
  article_id: number;
  user_id: number;
  title: string;
  content: string;
  creation_date: Date;
  user: TPostUser;
  comments: TComment[];
  bookmarks: TBookmark[]
};
