import { TTag } from "./tag";
import { TPostUser } from "./user";

export type TCreatePost = {
  title: string;
  content: string;
  tags: TTag[];
  cover: string;
};

export type TUpdatePost = {
  title: string;
  content: string;
  tags: TTag[];
  article_id: number;
};

export type TDeletePost = {
  article_id: number;
};

export type TRequestPosts = {
  tags?: string[];
  query?: string;
};

export type TMarkedPost = {
  tags: string[];
  query: string;
};

export type TPost = {
  article_id: number;
  user: TPostUser;
  title: string;
  content: string;
  creation_date: Date;
  cover: string;
};

export type TResponsePosts = {
  totalPages: number;
  totalPosts: number;
  page: number;
  posts: TPost[];
};
