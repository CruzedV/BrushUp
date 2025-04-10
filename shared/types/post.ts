import { TTag } from "./tag";
import { TPostUser } from "./user";

export type TCreatePost = {
  title: string;
  content: string;
  tags: TTag[];
  cover: any
  article_id: string;
};

export type TPostFilters<Type = TTag[]> = {
  tags: Type;
  query: string;
};

export type TPost = {
  article_id: string;
  user: TPostUser;
  title: string;
  content: string;
  creation_date: Date;
  cover: string;
  tags: TTag[];
};

export type TResponsePosts = {
  totalPages: number;
  totalPosts: number;
  page: number;
  posts: TPost[];
};
