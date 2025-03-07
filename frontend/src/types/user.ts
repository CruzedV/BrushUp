type TBaseUser = {
  user_id: string;
  username: string;
  profile_picture: string;
  email: string;
  bio: string;
}

export type TUser = {
  creation_date: Date;
} & TBaseUser;

export type TUpdateUser = {
  password: string;
  new_password: string;
} & TBaseUser;
