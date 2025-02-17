import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { TMarkedPosts, TRequestPosts, TResponsePosts } from "src/types/posts";
import { CreatePostDto, UpdatePostDto } from "src/dto/post.dto";
import { MarkPostDto } from "src/dto/mark.dto";
import { Bookmark } from "src/entities/bookmark.entity";
import {
  addCommentDto,
  deleteCommentDto,
  updateCommentDto,
} from "src/dto/comment.dto";

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
  ): Promise<TResponsePosts> {
    return this.postsService.getSubscribedPosts(
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

  @Put("update")
  async updatePost(
    @Query("id") id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete()
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

  @Delete("bookmark/:postId")
  async unmarkPost(@Body() markPostDto: MarkPostDto): Promise<void> {
    return this.postsService.unmarkPost(
      markPostDto.user,
      markPostDto.articleId,
    );
  }

  @Post("comment")
  async addComment(@Body() addCommentDto: addCommentDto) {
    return this.postsService.addComment(addCommentDto);
  }

  @Delete("comment")
  async deleteComment(@Body() deleteCommentDto: deleteCommentDto) {
    return this.postsService.deleteComment(deleteCommentDto);
  }

  @Patch("comment")
  async updateComment(@Body() updateCommentDto: updateCommentDto) {
    return this.postsService.updateComment(updateCommentDto);
  }

  @Get(":id")
  async getPostById(@Param("id") id: number) {
    return this.postsService.getPostById(id);
  }
}
