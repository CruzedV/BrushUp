import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { User } from "src/entities/user.entity";
import { Follower } from "src/entities/followers.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Follower])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
