import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import {
  TMarkedPost,
  TRequestPosts,
  TResponsePosts,
  TCreatePost,
  TUpdatePost,
} from "@shared/types/post";
import { AuthGuard } from "src/auth/auth.guard";
import { IRequestBody } from "src/dto/token.dto";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("/all")
  @UseGuards(AuthGuard)
  async getPosts(
    @Query("page") page: number = 1,
    @Body() body: TRequestPosts,
  ): Promise<TResponsePosts> {
    return this.postsService.getAllPosts(page, body.query, body.tags);
  }

  @Post("subscribed")
  @UseGuards(AuthGuard)
  async getSubscribedPosts(
    @Query("page") page: number = 1,
    @Body() body: TMarkedPost,
    @Req() req: IRequestBody,
  ): Promise<TResponsePosts> {
    return this.postsService.getSubscribedPosts(
      req.user.user_id,
      page,
      body.query,
      body.tags,
    );
  }

  @Post("create")
  @UseGuards(AuthGuard)
  async createPost(
    @Body() createPostDto: TCreatePost,
    @Req() req: IRequestBody,
  ) {
    return this.postsService.createPost(req.user.user_id, createPostDto);
  }

  @Put("update")
  @UseGuards(AuthGuard)
  async updatePost(
    @Body() updatePostDto: TUpdatePost,
    @Req() req: IRequestBody,
  ) {
    return this.postsService.updatePost(req.user.user_id, updatePostDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async deletePost(@Param("id") article_id: number, @Req() req: IRequestBody) {
    return this.postsService.deletePost(req.user.user_id, article_id);
  }

  @Get(":id")
  async getPostById(@Param("id") article_id: number) {
    return this.postsService.getPostById(article_id);
  }
}
