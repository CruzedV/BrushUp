import { User } from "src/entities/user.entity";
import { TPostUser } from "./user";

export type TRequestPosts = {
  tags?: string[];
  query?: string;
};

export type TMarkedPosts = {
  user_id: number;
  tags?: string[];
  query: string;
};

export type TPost = {
  article_id: number;
  title: string;
  content: string;
  creation_date: Date;
  user: TPostUser;
};

export type TResponsePosts = {
  totalPages: number;
  totalPosts: number;
  page: number;
  posts: TPost[];
};
