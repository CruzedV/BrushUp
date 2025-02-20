import { IsOptional } from "class-validator";
import { User } from "src/entities/user.entity";

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  profile_picture?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  new_password?: string;
}

export type TExtendedUser = User & {
  followersCount: number;
};
