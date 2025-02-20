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
import { TMarkPost } from "@shared/types/bookmarks";
import { Bookmark } from "src/entities/bookmark.entity";

import { TMarkedPost, TResponsePosts } from "@shared/types/post";
import { BookmarksService } from "./bookmarks.service";
import { AuthGuard } from "src/auth/auth.guard";
import { IJwtPayload } from "src/dto/token.dto";

@Controller("bookmarks")
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post("marked")
  @UseGuards(AuthGuard)
  async getMarkedPosts(
    @Query("page") page: number = 1,
    @Body() body: TMarkedPost,
    @Req() req: IJwtPayload,
  ): Promise<TResponsePosts> {
    return this.bookmarksService.getMarkedPosts(
      req.user_id,
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

  @Post()
  @UseGuards(AuthGuard)
  async markPost(
    @Req() req: IJwtPayload,
    @Body() markPostDto: TMarkPost,
  ): Promise<Bookmark> {
    return this.bookmarksService.markPost(req.user_id, markPostDto.article_id);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async unmarkPost(
    @Req() req: IJwtPayload,
    @Param("id") article_id: number,
  ): Promise<void> {
    return this.bookmarksService.unmarkPost(req.user_id, article_id);
  }
}
