import { Controller, Get, Post, Body } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { Tag } from "../entities/tags.entity";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async createTag(@Body() body: { name: string; color: string }): Promise<Tag> {
    return this.tagsService.createTag(body.name, body.color);
  }

  @Get()
  async getAllTags(): Promise<Tag[]> {
    return this.tagsService.getAllTags();
  }
}
