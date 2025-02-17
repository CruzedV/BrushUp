import { Body, Controller, Delete, Patch, Post } from "@nestjs/common";
import {
  addCommentDto,
  deleteCommentDto,
  updateCommentDto,
} from "src/dto/comment.dto";
import { CommentService } from "./comments.service";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async addComment(@Body() addCommentDto: addCommentDto) {
    return this.commentService.addComment(addCommentDto);
  }

  @Delete()
  async deleteComment(@Body() deleteCommentDto: deleteCommentDto) {
    return this.commentService.deleteComment(deleteCommentDto);
  }

  @Patch()
  async updateComment(@Body() updateCommentDto: updateCommentDto) {
    return this.commentService.updateComment(updateCommentDto);
  }
}
