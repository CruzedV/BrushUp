import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookmarksService } from "./bookmarks.service";
import { BookmarksController } from "./bookmarks.controller";
import { Bookmark } from "src/entities/bookmark.entity";
import { Post } from "src/entities/posts.entity";
import { User } from "src/entities/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { Token } from "src/entities/token.entity";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Post, Bookmark, User, Token]),
  ],
  providers: [BookmarksService],
  controllers: [BookmarksController],
  exports: [BookmarksService],
})
export class BookmarksModule {}
