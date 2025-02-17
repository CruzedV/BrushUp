import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "src/entities/posts.entity";
import { CreatePostDto, DeletePostDto, UpdatePostDto } from "src/dto/post.dto";
import { Follower } from "src/entities/followers.entity";
import { LIMIT } from "src/config";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getAllPosts(page: number, query: string = "", tags: string[] = []) {
    const offset = (page - 1) * LIMIT;

    const queryBuilder = this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .where("post.title ILIKE :query OR post.content ILIKE :query", {
        query: `%${query}%`,
      })
      .skip(offset)
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
      posts: posts.map((post: Post) => ({
        article_id: post.article_id,
        user_id: post.user.user_id,
        title: post.title,
        content: post.content,
        creation_date: post.creation_date,
        user: {
          user_id: post.user.user_id,
          username: post.user.username,
          profile_picture: post.user.profile_picture,
        },
      })),
    };
  }

  // Создание поста
  async createPost(dto: CreatePostDto) {
    const newPost = this.postRepository.create({ ...dto });
    return await this.postRepository.save(newPost);
  }

  // Обновлние поста
  async updatePost(dto: UpdatePostDto) {
    const post = await this.postRepository.findOne({
      where: { article_id: dto.article_id },
      relations: ["user"],
    });
    if (!post) throw new NotFoundException("Пост не найден");
    if (post.user.user_id !== dto.user_id)
      throw new ForbiddenException("Нет доступа к редактированию");
    post.title = dto.title;
    post.content = dto.content;
    return await this.postRepository.save(post);
  }

  // Удаление поста
  async deletePost(dto: DeletePostDto) {
    const post = await this.postRepository.findOne({
      where: { article_id: dto.article_id },
      relations: ["user"],
    });
    if (!post) throw new NotFoundException("Пост не найден");
    if (post.user.user_id !== dto.user_id)
      throw new ForbiddenException("Нет доступа к удалению");
    await this.postRepository.remove(post);
  }

  async getSubscribedPosts(
    user_id: number,
    page: number,
    query: string = "",
    tags: string[] = [],
  ) {
    const offset = (page - 1) * LIMIT;
    const queryBuilder = this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .innerJoin(
        Follower,
        "follower",
        "follower.followed_id.user_id = user.user_id AND follower.follower_id.user_id = :user_id",
        { user_id: user_id },
      )
      .where("post.title ILIKE :query OR post.content ILIKE :query", {
        query: `%${query}%`,
      })
      .skip(offset)
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
        user: {
          user_id: post.user.user_id,
          username: post.user.username,
          profile_picture: post.user.profile_picture,
        },
      })),
    };
  }

  // Получение поста по id
  async getPostById(article_id: number) {
    const post = await this.postRepository.findOne({
      where: { article_id },
      relations: ["user", "comments", "comments.user"],
    });
    if (!post) throw new NotFoundException("Пост не найден");
    return post;
  }
}
