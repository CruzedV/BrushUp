import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { ImageReference } from "../entities/reference.entity";
import { ImageTag } from "../entities/reference.entity";
import { ReferenceTag } from "../entities/reference.entity";

@Injectable()
export class ReferenceService {
  constructor(
    @InjectRepository(ImageReference)
    private readonly imageReferenceRepository: Repository<ImageReference>,
    @InjectRepository(ImageTag)
    private readonly imageTagRepository: Repository<ImageTag>,
    @InjectRepository(ReferenceTag)
    private readonly referenceTagRepository: Repository<ReferenceTag>,
  ) {}

  async getReferencesByTags(
    tags: string[],
    limit: number = 100,
  ): Promise<{ totalCount: number; images: string[] }> {
    let imageUrls: string[];

    if (tags.length === 0) {
      // Если теги не переданы — получаем случайные N изображений прямо из БД
      const randomImages = await this.imageReferenceRepository
        .createQueryBuilder("imagereferences")
        .orderBy("RANDOM()")
        .limit(limit)
        .getMany();

      imageUrls = randomImages.map((img) => img.image_url);
    } else {
      // Получаем ID тегов
      const tagEntities = await this.imageTagRepository.find({
        where: { name: In(tags) },
      });
      if (tagEntities.length === 0) {
        throw new NotFoundException("Теги не найдены");
      }

      const tagIds = tagEntities.map((tag) => tag.tag_id);

      // Выбираем изображения с учетом тегов, ограничиваем выборку
      const randomTaggedImages = await this.referenceTagRepository
        .createQueryBuilder("referencetags")
        .innerJoinAndSelect("referencetags.reference", "imagereferences")
        .where("referencetags.tag_id IN (:...tagIds)", { tagIds })
        .orderBy("RANDOM()") // Перемешиваем
        .limit(limit)
        .getMany();
      imageUrls = [
        ...new Set(randomTaggedImages.map((rt) => rt.reference.image_url)),
      ];
    }
    return {
      totalCount: imageUrls.length,
      images: imageUrls,
    };
  }
}
