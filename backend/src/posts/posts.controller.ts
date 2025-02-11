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
import { CreatePostDto, UpdatePostDto } from "src/dto/post.dto";
import { MarkPostDto } from "src/dto/mark.dto";
import { Bookmark } from "src/entities/bookmark.entity";
import { addCommentDto } from "src/dto/comment.dto";

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

  @Post("marked")
  async getMarkedPosts(
    @Query("page") page: number = 1,
    @Body() body: TMarkedPosts,
  ): Promise<TResponsePosts> {
    return this.postsService.getMarkedPosts(
      body.user,
      page,
      body.query,
      body.tags,
    );
  }

  @Post("subscribed")
  async getSubscribedPosts(
    @Query("page") page: number = 1,
    @Body() body: TMarkedPosts,
  ): Promise<TRequestPosts> {
    return this.postService.getSubscribedPosts(
      body.user,
      page,
      body.query,
      body.tags,
    );
  }

  @Post("create")
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Put(":id")
  async updatePost(
    @Query("id") id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(":id")
  async deletePost(
    @Query("postId") postId: number,
    @Query("userId") userId: number,
  ) {
    return this.postsService.deletePost(userId, postId);
  }

  @Post("mark")
  async markPost(@Body() markPostDto: MarkPostDto): Promise<Bookmark> {
    return this.postsService.markPost(markPostDto.user, markPostDto.articleId);
  }

  @Post("comment")
  async addComment(@Body() addCommentDto: addCommentDto) {
    return this.postsService.addComment(addCommentDto);
  }

  @Delete("comment")
  async deleteComment(@Query("commentId") commentId: number) {
    return this.postsService.deleteComment(commentId);
  }

  @Get(":id")
  async getPostById(@Param("id") id: number) {
    return this.postsService.getPostById(id);
  }
}
