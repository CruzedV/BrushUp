import { TUser } from "./user";

export type TArticle = {
  articleId: string;
  user: TUser;
  title: string;
  content: string;
  creationDate: Date;
}

export type TTag = {
  tagId: string;
  name: string;
  color: string;
};