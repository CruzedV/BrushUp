import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LIMIT } from "src/config";
import { Bookmark } from "src/entities/bookmark.entity";
import { Post } from "src/entities/posts.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  // Добавление в закладки
  async markPost(user: User, article_id: number): Promise<Bookmark> {
    const post = await this.postRepository.findOne({
      where: { article_id },
    });
    if (!post) throw new NotFoundException("Пост не найден");

    // Проверяем, есть ли уже такая закладка
    const existingBookmark = await this.bookmarkRepository.findOne({
      where: {
        user: { user_id: user.user_id },
        post: { article_id },
      },
    });

    if (existingBookmark) return existingBookmark;

    const bookmark = this.bookmarkRepository.create({ user, post });
    return await this.bookmarkRepository.save(bookmark);
  }

  // Удаление из закладок
  async unmarkPost(user: User, article_id: number): Promise<void> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: {
        user: { user_id: user.user_id },
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
    user_id: number,
    page: number,
    query: string = "",
    tags: string[] = [],
  ) {
    const offset = (page - 1) * LIMIT;

    const queryBuilder = this.bookmarkRepository
      .createQueryBuilder("bookmark")
      .leftJoinAndSelect("bookmark.post", "post")
      .leftJoinAndSelect("post.user", "user")
      .where("bookmark.user = :user_id", { user_id: user_id })
      .andWhere("post.title ILIKE :query OR post.content ILIKE :query", {
        query: `%${query}%`,
      })
      .skip(offset)
      .take(LIMIT);

    if (tags.length > 0) {
      queryBuilder
        .innerJoin("post.tags", "tag")
        .andWhere("tag.name IN (:...tags)", { tags });
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
        user: {
          user_id: bookmark.post.user.user_id,
          username: bookmark.post.user.username,
          profile_picture: bookmark.post.user.profile_picture,
        },
      })),
    };
  }
}
