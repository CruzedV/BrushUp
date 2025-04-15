import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { ImageReference } from "../entities/reference.entity";
import { ImageTag } from "../entities/reference.entity";
import { ReferenceTag } from "../entities/reference.entity";
import { TReferenceArray, TReferenceTags } from "@shared/types/reference";

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
  ): Promise<TReferenceArray> {
    let imageUrls: string[];

    if (tags.length === 0) {
      const randomImages = await this.imageReferenceRepository
        .createQueryBuilder("imagereferences")
        .orderBy("RANDOM()")
        .limit(limit)
        .getMany();

      imageUrls = randomImages.map((img) => img.image_url);
    } else {
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
        .innerJoin("referencetags.reference", "imagereferences")
        .where("referencetags.tag_id IN (:...tagIds)", { tagIds })
        .select("DISTINCT referencetags.reference_id", "reference_id")
        .limit(limit)
        .getRawMany();

      const referenceIds = randomTaggedImages.map((rt) => rt.reference_id);

      const images = await this.imageReferenceRepository.findBy({
        reference_id: In(referenceIds),
      });

      imageUrls = images.map((img) => img.image_url);
    }
    return {
      total_count: imageUrls.length,
      images: imageUrls,
    };
  }

  async getAllTags(): Promise<TReferenceTags> {
    const result = await this.imageTagRepository.query(`
      SELECT jsonb_build_object(
        'sex', (
          SELECT jsonb_agg(jsonb_build_object('tag_id', tag_id, 'name', name)) 
          FROM imagetags WHERE name IN ('Мужчина', 'Женщина')
        ),
        'clothing', (
          SELECT jsonb_agg(jsonb_build_object('tag_id', tag_id, 'name', name)) 
          FROM imagetags WHERE name IN ('В одежде', 'Без одежды')
        ),
        'pose', (
          SELECT jsonb_agg(jsonb_build_object('tag_id', tag_id, 'name', name)) 
          FROM imagetags WHERE name IN ('В действии', 'Статичная')
        ),
        'view', (
          SELECT jsonb_agg(jsonb_build_object('tag_id', tag_id, 'name', name)) 
          FROM imagetags WHERE name IN ('Спереди', 'Сбоку', 'Сзади', 'Другое')
        )
      ) AS generator_tags;
    `);

    return result[0].generator_tags;
  }
}
