import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { Post } from "src/entities/posts.entity";
import { Comment } from "src/entities/comment.entity";
import { User } from "src/entities/user.entity";
import { Bookmark } from "src/entities/bookmark.entity";
import { AuthModule } from "src/auth/auth.module";
import { Token } from "src/entities/token.entity";
import { ImageService } from "src/images/images.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Post, Comment, User, Bookmark, Token]),
  ],
  providers: [PostsService, ImageService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
