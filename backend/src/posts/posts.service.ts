import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "src/entities/posts.entity";
import { TCreatePost } from "@shared/types/post";
import { Follower } from "src/entities/followers.entity";
import { LIMIT } from "@shared/config";
import { ImageService } from "src/images/images.service";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly imageService: ImageService,
  ) {}

  async getAllPosts(page: number, query: string = "", tags: string[] = []) {
    const offset = (page - 1) * LIMIT;

    const queryBuilder = this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("post.tags", "tag")
      .where("post.title ILIKE :query OR post.content ILIKE :query", {
        query: `%${query}%`,
      })
      .skip(offset)
      .orderBy("post.creation_date", "DESC", "NULLS LAST")
      .take(LIMIT);

    if (tags.length > 0) {
      queryBuilder.andWhere("tag.name IN (:...tags)", { tags });
    }

    const [posts, total] = await queryBuilder.getManyAndCount();

    return {
      totalPages: Math.ceil(total / LIMIT),
      totalPosts: total,
      page: page,
      posts: posts.map((post: Post) => ({
        article_id: post.article_id,
        user_id: post.user.user_id,
        title: post.title,
        content: post.content,
        creation_date: post.creation_date,
        cover: post.cover,
        tags: post.tags,
        user: {
          user_id: post.user.user_id,
          username: post.user.username,
          profile_picture: post.user.profile_picture,
        },
      })),
    };
  }

  // Создание поста
  async createPost(user_id: string, dto: TCreatePost) {
    let content = dto.content;
    let cover = dto.cover;

    const regex = /<img[^>]+src="(data:image\/[a-z]+;base64,[^">]+)"/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const base64 = match[1];
      const url = await this.imageService.saveBase64Image(base64);
      content = content.replace(base64, url);
    }
    if (cover?.startsWith("data:image")) {
      cover = await this.imageService.saveBase64Image(cover);
    }
    const post = this.postRepository.create({
      user_id,
      ...dto,
      content,
      cover,
    });
    return await this.postRepository.save(post);
  }

  // Обновлние поста
  async updatePost(user_id: string, dto: Required<TCreatePost>) {
    const post = await this.postRepository.findOne({
      where: { article_id: dto.article_id },
      relations: ["user"],
    });
    if (!post) throw new NotFoundException("Пост не найден");
    if (post.user.user_id !== user_id)
      throw new ForbiddenException("Нет доступа к редактированию");
    post.title = dto.title;
    post.content = dto.content;
    return await this.postRepository.save(post);
  }

  // Удаление поста
  async deletePost(user_id: string, article_id: string) {
    const post = await this.postRepository.findOne({
      where: { article_id: article_id },
      relations: ["user"],
    });
    if (!post) throw new NotFoundException("Пост не найден");
    if (post.user.user_id !== user_id)
      throw new ForbiddenException("Нет доступа к удалению");
    await this.postRepository.remove(post);
  }

  async getSubscribedPosts(
    user_id: string,
    page: number,
    query: string = "",
    tags: string[] = [],
  ) {
    const offset = (page - 1) * LIMIT;
    const queryBuilder = this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("post.tags", "tag")
      .innerJoin(
        Follower,
        "follower",
        "follower.followed_id = user.user_id AND follower.follower_id = :user_id",
        { user_id },
      )
      .where("post.title ILIKE :query OR post.content ILIKE :query", {
        query: `%${query}%`,
      })
      .skip(offset)
      .orderBy("post.creation_date", "DESC", "NULLS LAST")
      .take(LIMIT);

    if (tags.length > 0) {
      queryBuilder
        .innerJoin("post.tags", "tag")
        .andWhere("tag.name IN (:...tags)", { tags });
    }

    const [posts, total] = await queryBuilder.getManyAndCount();

    return {
      totalPages: Math.ceil(total / LIMIT),
      totalPosts: total,
      page: page,
      posts: posts.map((post) => ({
        article_id: post.article_id,
        user_id: post.user.user_id,
        title: post.title,
        content: post.content,
        creation_date: post.creation_date,
        cover: post.cover,
        tags: post.tags,
        user: {
          user_id: post.user.user_id,
          username: post.user.username,
          profile_picture: post.user.profile_picture,
        },
      })),
    };
  }

  // Получение поста по id
  async getPostById(article_id: string) {
    const post = await this.postRepository.findOne({
      where: { article_id },
      relations: ["user", "comments", "comments.user", "tags"],
    });
    if (!post) throw new NotFoundException("Пост не найден");
    return post;
  }

  // Получение интересных статей
  async getInterestingPosts() {
    const count = await this.postRepository.count();
    if (count === 0) return [];

    const randomOffset = Math.floor(Math.random() * Math.max(1, count - 1));

    const posts = await this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("post.tags", "tags")
      .skip(randomOffset)
      .take(2)
      .getMany();

    return posts;
  }
}
