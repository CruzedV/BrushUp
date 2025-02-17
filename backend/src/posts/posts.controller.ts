import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { TMarkedPosts, TRequestPosts, TResponsePosts } from "src/types/posts";
import { CreatePostDto, DeletePostDto, UpdatePostDto } from "src/dto/post.dto";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("/all")
  async getPosts(
    @Query("page") page: number = 1,
    @Body() body: TRequestPosts,
  ): Promise<TResponsePosts> {
    return this.postsService.getAllPosts(page, body.query, body.tags);
  }

  @Post("subscribed")
  async getSubscribedPosts(
    @Query("page") page: number = 1,
    @Body() body: TMarkedPosts,
  ): Promise<TResponsePosts> {
    return this.postsService.getSubscribedPosts(
      body.user_id,
      page,
      body.query,
      body.tags,
    );
  }

  @Post("create")
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Put("update")
  async updatePost(@Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(updatePostDto);
  }

  @Delete()
  async deletePost(@Body() deletePostDto: DeletePostDto) {
    return this.postsService.deletePost(deletePostDto);
  }

  @Get(":id")
  async getPostById(@Param("id") id: number) {
    return this.postsService.getPostById(id);
  }
}
