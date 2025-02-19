import { TTag } from "./tag";
import { TPostUser } from "./user";

export type CreatePostDto = {
  user_id: number;
  title: string;
  content: string;
  tags: TTag[];
};

export type UpdatePostDto = {
  user_id: number;
  title: string;
  content: string;
  tags: TTag[];
  article_id: number;
};

export type DeletePostDto = {
  article_id: number;
  user_id: number;
};

export type RequestPostsDto = {
  tags?: string[];
  query?: string;
};

export type MarkedPostsDto = {
  user_id: number;
  tags?: string[];
  query: string;
};

export type TPost = {
  article_id: number;
  user: TPostUser;
  title: string;
  content: string;
  creation_date: Date;
};

export type ResponsePostsDto = {
  totalPages: number;
  totalPosts: number;
  page: number;
  posts: TPost[];
};
