import { User } from "src/entities/user.entity";

export type TPostUser = {
  user_id: number;
  username: string;
  profile_picture: string;
};

export type TExtendedUser = User & {
  followersCount: number;
};
