import { Controller, Post, Body } from "@nestjs/common";
import { ReferenceService } from "./references.service";

@Controller("references")
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Post("by-tags")
  async getReferences(
    @Body("tags") tags: string[],
  ): Promise<{ totalCount: number; images: string[] }> {
    return this.referenceService.getReferencesByTags(tags);
  }
}
