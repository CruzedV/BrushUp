import { User } from "src/entities/user.entity";

export type TPostUser = {
  userId: number;
  username: string;
  profilePicture: string;
};

export type TExtendedUser = User & {
  followersCount: number;
};
