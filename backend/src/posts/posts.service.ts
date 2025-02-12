import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "src/entities/posts.entity";
import { User } from "src/entities/user.entity";
import { CreatePostDto, UpdatePostDto } from "src/dto/post.dto";
import { Bookmark } from "src/entities/bookmark.entity";
import { addCommentDto } from "src/dto/comment.dto";
import { Comment } from "src/entities/comment.entity";

const limit = 10;

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllPosts(page: number, query: string = "", tags: string[] = []) {
    const offset = (page - 1) * limit;

    const queryBuilder = this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .where("post.title ILIKE :query OR post.content ILIKE :query", {
        query: `%${query}%`,
      })
      .skip(offset)
      .take(limit);

    if (tags.length > 0) {
      queryBuilder
        .innerJoin("post.tags", "tag")
        .andWhere("tag.name IN (:...tags)", { tags });
    }

    const [posts, total] = await queryBuilder.getManyAndCount();

    return {
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      page: page,
      posts: posts.map((post: Post) => ({
        articleId: post.articleId,
        userId: post.user.userId,
        title: post.title,
        content: post.content,
        creationDate: post.creationDate,
        user: {
          userId: post.user.userId,
          username: post.user.username,
          profilePicture: post.user.profilePicture,
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
  async updatePost(userId: number, dto: UpdatePostDto) {
    const post = await this.postRepository.findOne({
      where: { articleId: dto.articleId },
      relations: ["user"],
    });
    if (!post) throw new NotFoundException("Пост не найден");
    if (post.user.userId !== userId)
      throw new ForbiddenException("Нет доступа к редактированию");
    post.title = dto.title;
    post.content = dto.content;
    return await this.postRepository.save(post);
  }

  // Удаление поста
  async deletePost(userId: number, postId: number) {
    const post = await this.postRepository.findOne({
      where: { articleId: postId },
      relations: ["user"],
    });
    if (!post) throw new NotFoundException("Пост не найден");
    if (post.user.userId !== userId)
      throw new ForbiddenException("Нет доступа к удалению");
    await this.postRepository.remove(post);
  }

  // Добавление в закладки
  async markPost(user: User, postId: number): Promise<Bookmark> {
    const post = await this.postRepository.findOne({
      where: { articleId: postId },
    });
    if (!post) throw new NotFoundException("Пост не найден");
    const bookmark: Bookmark = this.bookmarkRepository.create({ user, post });
    return await this.bookmarkRepository.save(bookmark);
  }

  // Получение закладок
  async getMarkedPosts(
    user: User,
    page: number,
    query: string = "",
    tags: string[] = [],
  ) {
    const offset = (page - 1) * limit;

    const queryBuilder = this.bookmarkRepository
      .createQueryBuilder("bookmark")
      .leftJoinAndSelect("bookmark.post", "post")
      .leftJoinAndSelect("post.user", "user")
      .where("bookmark.user = :userId", { userId: user.userId })
      .andWhere("post.title ILIKE :query OR post.content ILIKE :query", {
        query: `%${query}%`,
      })
      .skip(offset)
      .take(limit);

    if (tags.length > 0) {
      queryBuilder
        .innerJoin("post.tags", "tag")
        .andWhere("tag.name IN (:...tags)", { tags });
    }

    const [bookmarks, total] = await queryBuilder.getManyAndCount();

    return {
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      page: page,
      posts: bookmarks.map((bookmark) => ({
        articleId: bookmark.post.articleId,
        userId: bookmark.post.user.userId,
        title: bookmark.post.title,
        content: bookmark.post.content,
        creationDate: bookmark.post.creationDate,
        user: {
          userId: bookmark.post.user.userId,
          username: bookmark.post.user.username,
          profilePicture: bookmark.post.user.profilePicture,
        },
      })),
    };
  }

  async getSubscribedPosts(
    user: User,
    page: number,
    query: string = "",
    tags: string[] = [],
  ) {
    const offset = (page - 1) * limit;
    const queryBuilder = this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .innerJoin(
        "followers",
        "follower",
        "follower.followedId = user.userId AND follower.followerId = :userId",
        {
          userId: user.userId,
        },
      )
      .where("post.title ILIKE :query OR post.content ILIKE :query", {
        query: `%${query}%`,
      })
      .skip(offset)
      .take(limit);

    if (tags.length > 0) {
      queryBuilder
        .innerJoin("post.tags", "tag")
        .andWhere("tag.name IN (:...tags)", { tags });
    }

    const [posts, total] = await queryBuilder.getManyAndCount();

    return {
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      page: page,
      posts: posts.map((post) => ({
        articleId: post.articleId,
        userId: post.user.userId,
        title: post.title,
        content: post.content,
        creationDate: post.creationDate,
        user: {
          userId: post.user.userId,
          username: post.user.username,
          profilePicture: post.user.profilePicture,
        },
      })),
    };
  }

  // Добавление комментария
  async addComment(dto: addCommentDto) {
    const post = await this.postRepository.findOne({
      where: { articleId: dto.postId },
      relations: ["comments"],
    });

    const user = await this.userRepository.findOne({
      where: { userId: dto.user.userId },
    });

    if (!post) throw new NotFoundException("Пост не найден");
    if (!user) throw new NotFoundException("Пользователь не найден");
    const comment = this.commentRepository.create({
      user: user,
      post: post,
      text: dto.text,
    });
    return await this.commentRepository.save(comment);
  }

  async deleteComment(commentId: number) {
    return await this.commentRepository.delete(commentId);
  }

  // Получение поста по id
  async getPostById(postId: number) {
    const post = await this.postRepository.findOne({
      where: { articleId: postId },
      relations: ["user", "comments"],
    });
    if (!post) throw new NotFoundException("Пост не найден");
    return post;
  }
}
