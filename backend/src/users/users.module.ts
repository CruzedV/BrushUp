import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { User } from "src/entities/user.entity";
import { Follower } from "src/entities/followers.entity";
import { AuthModule } from "src/auth/auth.module";
import { Token } from "src/entities/token.entity";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, Follower, Token])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
