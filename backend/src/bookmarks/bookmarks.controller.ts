import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Bookmark } from "src/entities/bookmark.entity";

import { TPostFilters, TResponsePosts } from "@shared/types/post";
import { BookmarksService } from "./bookmarks.service";
import { AuthGuard } from "src/auth/auth.guard";
import { TRequestBody } from "@shared/types/tokens";

@Controller("bookmarks")
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post("marked")
  @UseGuards(AuthGuard)
  async getMarkedPosts(
    @Query("page") page: number = 1,
    @Body() body: TPostFilters<string[]>,
    @Req() req: TRequestBody,
  ): Promise<TResponsePosts> {
    return this.bookmarksService.getMarkedPosts(
      req.user.user_id,
      page,
      body.query,
      body.tags,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllMarks() {
    return this.bookmarksService.getAllMarks();
  }

  @Post(":id")
  @UseGuards(AuthGuard)
  async markPost(
    @Req() req: TRequestBody,
    @Param("id") article_id: string,
  ): Promise<Bookmark> {
    return this.bookmarksService.markPost(req.user.user_id, article_id);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async unmarkPost(
    @Req() req: TRequestBody,
    @Param("id") article_id: string,
  ): Promise<void> {
    return this.bookmarksService.unmarkPost(req.user.user_id, article_id);
  }
}
