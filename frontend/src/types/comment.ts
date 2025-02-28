import { TUser } from "./user";

export type TComment = {
  comment_id: string;
  text: string;
  user: TUser;
};
