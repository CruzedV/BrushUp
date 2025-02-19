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
import {
  MarkedPostsDto,
  RequestPostsDto,
  ResponsePostsDto,
  CreatePostDto,
  UpdatePostDto,
} from "@shared/types/post";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("/all")
  async getPosts(
    @Query("page") page: number = 1,
    @Body() body: RequestPostsDto,
  ): Promise<ResponsePostsDto> {
    return this.postsService.getAllPosts(page, body.query, body.tags);
  }

  @Post("subscribed")
  async getSubscribedPosts(
    @Query("page") page: number = 1,
    @Body() body: MarkedPostsDto,
  ): Promise<ResponsePostsDto> {
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
  async deletePost(
    @Query("user_id") user_id: number,
    @Query("article_id") article_id: number,
  ) {
    return this.postsService.deletePost(user_id, article_id);
  }

  @Get(":id")
  async getPostById(@Param("id") id: number) {
    return this.postsService.getPostById(id);
  }
}
