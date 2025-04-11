import { UploadFile } from "antd";

type TBaseUser = {
  user_id: string;
  username: string;
  email: string;
  bio: string;
}

export type TUser = {
  creation_date: Date;
  profile_picture: string;
} & TBaseUser;

export type TUpdateUser = {
  password: string;
  new_password: string;
  profile_picture: UploadCover;
} & TBaseUser;

export interface UploadCover {
  file: File;
  fileList: UploadFile[];
}
