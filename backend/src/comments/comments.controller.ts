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
import { IJwtPayload } from "src/dto/token.dto";

@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addComment(
    @Req() req: IJwtPayload,
    @Body() addCommentDto: addCommentDto,
  ) {
    return this.commentService.addComment(req.user_id, addCommentDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  async deleteComment(
    @Req() req: IJwtPayload,
    @Param("id") comment_id: number,
  ) {
    return this.commentService.deleteComment(req.user_id, comment_id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  async updateComment(
    @Req() req: IJwtPayload,
    @Body() updateCommentDto: updateCommentDto,
  ) {
    return this.commentService.updateComment(req.user_id, updateCommentDto);
  }
}
