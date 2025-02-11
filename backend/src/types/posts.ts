import { User } from "src/entities/user.entity";
import { TPostUser } from "./user";

export type TRequestPosts = {
  tags?: string[];
  query?: string;
};

export type TMarkedPosts = {
  user: User;
  tags?: string[];
  query: string;
};

export type TPost = {
  articleId: number;
  title: string;
  content: string;
  creationDate: Date;
  user: TPostUser;
};

export type TResponsePosts = {
  totalPages: number;
  totalPosts: number;
  page: number;
  posts: TPost[];
};
