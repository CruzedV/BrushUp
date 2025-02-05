import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { User } from "src/entities/user.entity";
import { Followers } from "src/entities/followers.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Followers])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
