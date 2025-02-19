import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { MarkPostDto } from "src/dto/mark.dto";
import { Bookmark } from "src/entities/bookmark.entity";

import { MarkedPostsDto, ResponsePostsDto } from "@shared/types/post";
import { BookmarksService } from "./bookmarks.service";

@Controller("bookmarks")
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post("marked")
  async getMarkedPosts(
    @Query("page") page: number = 1,
    @Body() body: MarkedPostsDto,
  ): Promise<ResponsePostsDto> {
    return this.bookmarksService.getMarkedPosts(
      body.user_id,
      page,
      body.query,
      body.tags,
    );
  }

  @Get("bookmark")
  async getAllMarks() {
    return this.bookmarksService.getAllMarks();
  }

  @Post("bookmark")
  async markPost(@Body() markPostDto: MarkPostDto): Promise<Bookmark> {
    return this.bookmarksService.markPost(
      markPostDto.user,
      markPostDto.article_id,
    );
  }

  @Delete("bookmark")
  async unmarkPost(@Body() markPostDto: MarkPostDto): Promise<void> {
    return this.bookmarksService.unmarkPost(
      markPostDto.user,
      markPostDto.article_id,
    );
  }
}
