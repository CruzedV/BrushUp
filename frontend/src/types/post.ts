import { TPostUser } from "@shared/types/user";
import { TBookmark } from "./bookmark";
import { TComment } from "./comment";
import { TPostFilters } from "@shared/types/post";

export type TPost = {
  article_id: string;
  user_id: string;
  title: string;
  content: string;
  creation_date: Date;
  user: TPostUser;
  comments: TComment[];
  bookmarks: TBookmark[]
};

export type TGetPostsParams = {
  page: number;
  data: TPostFilters;
  user_id?: string;
}
