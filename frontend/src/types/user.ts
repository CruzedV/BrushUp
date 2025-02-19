type TBaseUser = {
  user_id: string;
  username: string;
  profile_picture: string;
}

export type TUser = {
  email: string;
  bio: string;
  creation_date: Date;
} & TBaseUser;

export type TUpdateUser = {
  password: string;
  new_password: string;
} & TBaseUser;
