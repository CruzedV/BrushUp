import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookmarksService } from "./bookmarks.service";
import { BookmarksController } from "./bookmarks.controller";
import { Bookmark } from "src/entities/bookmark.entity";
import { Post } from "src/entities/posts.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Bookmark])],
  providers: [BookmarksService],
  controllers: [BookmarksController],
  exports: [BookmarksService],
})
export class BookmarksModule {}
