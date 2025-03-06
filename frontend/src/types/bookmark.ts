import { TPost } from "./post";
import { TUser } from "./user";

export type TBookmark = {
  bookmark_id: string;
  post?: TPost;
  user?: TUser;
}