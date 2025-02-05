import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "src/entities/posts.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getAllPosts(page: number, query: string = "", tags: string[] = []) {
    const limit = 10;
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
}
