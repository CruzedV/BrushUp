import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { addCommentDto, updateCommentDto } from "src/dto/comment.dto";
import { CommentService } from "./comments.service";
import { AuthGuard } from "src/auth/auth.guard";
import { TRequestBody } from "@shared/types/tokens";

@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addComment(
    @Req() req: TRequestBody,
    @Body() addCommentDto: addCommentDto,
  ) {
    return this.commentService.addComment(req.user.user_id, addCommentDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async deleteComment(
    @Req() req: TRequestBody,
    @Param("id") comment_id: string,
  ) {
    return this.commentService.deleteComment(req.user.user_id, comment_id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  async updateComment(
    @Req() req: TRequestBody,
    @Body() updateCommentDto: updateCommentDto,
  ) {
    return this.commentService.updateComment(
      req.user.user_id,
      updateCommentDto,
    );
  }
}
