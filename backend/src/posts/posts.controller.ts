import { Body, Controller, Post, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { TRequestPosts, TResponsePosts } from "src/types/posts";

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
}
