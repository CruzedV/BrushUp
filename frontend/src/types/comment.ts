import { TUser } from "./user";

export type TComment = {
  comment_id: number;
  text: string;
  user: TUser;
};
