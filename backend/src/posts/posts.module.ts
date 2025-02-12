import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { Post } from "src/entities/posts.entity";
import { Comment } from "src/entities/comment.entity";
import { User } from "src/entities/user.entity";
import { Bookmark } from "src/entities/bookmark.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, User, Bookmark])],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
