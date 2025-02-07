import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
