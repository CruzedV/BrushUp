import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "../entities/tags.entity";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  // Создание тега
  async createTag(name: string, color: string): Promise<Tag> {
    const tag = this.tagRepository.create({ name, color });
    return await this.tagRepository.save(tag);
  }

  // Получение всех тегов
  async getAllTags(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }
}
