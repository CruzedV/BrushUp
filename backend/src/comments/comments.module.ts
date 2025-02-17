import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "src/entities/comment.entity";
import { Post } from "src/entities/posts.entity";
import { User } from "src/entities/user.entity";
import { CommentService } from "./comments.service";
import { CommentController } from "./comments.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentsModule {}
