import { TPost } from "@shared/types/post";
import { TBookmark } from "./bookmark";
import { TComment } from "./comment";
import { TPostFilters } from "@shared/types/post";

export type TDetailedPost = {
  user_id: string;
  creation_date: Date;
  comments: TComment[];
  bookmarks: TBookmark[]
} & TPost;

export type TGetPostsParams = {
  page: number;
  data: TPostFilters;
  user_id?: string;
}
