import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "src/entities/comment.entity";
import { Post } from "src/entities/posts.entity";
import { User } from "src/entities/user.entity";
import { CommentService } from "./comments.service";
import { CommentController } from "./comments.controller";
import { AuthModule } from "src/auth/auth.module";
import { Token } from "src/entities/token.entity";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Comment, Post, User, Token])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentsModule {}
