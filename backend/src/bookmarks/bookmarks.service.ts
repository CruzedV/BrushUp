import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LIMIT } from "@shared/config";
import { Bookmark } from "src/entities/bookmark.entity";
import { Post } from "src/entities/posts.entity";
import { User } from "src/entities/user.entity";
import { QueryFailedError, Repository } from "typeorm";

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Добавление в закладки
  async markPost(user_id: string, article_id: string): Promise<Bookmark> {
    const post = await this.postRepository.findOne({ where: { article_id } });
    if (!post) throw new NotFoundException("Пост не найден");

    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) throw new NotFoundException("Пользователь не найден");

    try {
      const bookmark = this.bookmarkRepository.create({ user, post });
      return await this.bookmarkRepository.save(bookmark);
    } catch (error: unknown) {
      if (
        error instanceof QueryFailedError &&
        "code" in error &&
        error.code === "23505"
      ) {
        throw new ConflictException("Этот пост уже добавлен в закладки");
      }
      throw error;
    }
  }
  // Удаление из закладок
  async unmarkPost(user_id: string, article_id: string): Promise<void> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: {
        user: { user_id: user_id },
        post: { article_id: article_id },
      },
      relations: ["user", "post"],
    });

    if (!bookmark) throw new NotFoundException("Закладка не найдена");

    await this.bookmarkRepository.remove(bookmark);
  }

  async getAllMarks(): Promise<Bookmark[]> {
    const marks = await this.bookmarkRepository.find();
    return marks;
  }

  // Получение закладок
  async getMarkedPosts(
    user_id: string,
    page: number,
    query: string = "",
    tags: string[] = [],
  ) {
    const offset = (page - 1) * LIMIT;

    const queryBuilder = this.bookmarkRepository
      .createQueryBuilder("bookmark")
      .leftJoinAndSelect("bookmark.post", "post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("post.tags", "tag")
      .where("bookmark.user = :user_id", { user_id: user_id })
      .andWhere("post.title ILIKE :query OR post.content ILIKE :query", {
        query: `%${query}%`,
      })
      .skip(offset)
      .orderBy("post.creation_date", "DESC", "NULLS LAST")
      .take(LIMIT);

    if (tags.length > 0) {
      queryBuilder.andWhere("tag.name IN (:...tags)", { tags });
    }

    const [bookmarks, total] = await queryBuilder.getManyAndCount();

    return {
      totalPages: Math.ceil(total / LIMIT),
      totalPosts: total,
      page: page,
      posts: bookmarks.map((bookmark) => ({
        article_id: bookmark.post.article_id,
        user_id: bookmark.post.user.user_id,
        title: bookmark.post.title,
        content: bookmark.post.content,
        creation_date: bookmark.post.creation_date,
        cover: bookmark.post.cover,
        tags: bookmark.post.tags,
        user: {
          user_id: bookmark.post.user.user_id,
          username: bookmark.post.user.username,
          profile_picture: bookmark.post.user.profile_picture,
        },
      })),
    };
  }
}
