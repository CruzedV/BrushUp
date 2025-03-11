import { Controller, Post, Get, Body } from "@nestjs/common";
import { ReferenceService } from "./references.service";
import { TReferenceTags } from "@shared/types/reference";

@Controller("references")
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Post("by-tags")
  async getReferences(
    @Body("tags") tags: string[],
  ): Promise<{ totalCount: number; images: string[] }> {
    return this.referenceService.getReferencesByTags(tags);
  }

  @Get("tags")
  async getTags(): Promise<TReferenceTags> {
    return this.referenceService.getAllTags();
  }
}
