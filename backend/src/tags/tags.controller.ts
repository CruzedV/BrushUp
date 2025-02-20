import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { Tag } from "../entities/tags.entity";
import { AuthGuard } from "src/auth/auth.guard";
@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createTag(@Body() body: { name: string; color: string }): Promise<Tag> {
    return this.tagsService.createTag(body.name, body.color);
  }

  @Get()
  async getAllTags(): Promise<Tag[]> {
    return this.tagsService.getAllTags();
  }
}
