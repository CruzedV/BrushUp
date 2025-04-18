import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { Follower } from "src/entities/followers.entity";
import { RegisterDto } from "src/dto/register.dto";
import { TExtendedUser } from "src/dto/user.dto";
import { UpdateUserDto } from "src/dto/user.dto";
import { hash, compare } from "bcrypt";
import { LIMIT } from "@shared/config";
import { Post } from "src/entities/posts.entity";
import { Bookmark } from "src/entities/bookmark.entity";
import { ImageService } from "src/images/images.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,

    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly imageService: ImageService,
  ) {}

  async createUser(registerDto: RegisterDto): Promise<User> {
    const user = this.userRepository.create(registerDto);
    return this.userRepository.save(user);
  }

  async deleteUser(user_id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${user_id} не найден`);
    }

    await this.followerRepository.delete({ followed: { user_id } });
    await this.followerRepository.delete({ follower: { user_id } });

    await this.userRepository.remove(user);
  }

  async updateUser(user_id: string, dto: UpdateUserDto): Promise<void> {
    let profile_picture = dto.profile_picture;

    const user = await this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.user_id = :user_id", { user_id })
      .getOne();

    if (!user) throw new NotFoundException("Пользователь не найден");

    if (dto.password && dto.new_password) {
      const isMatch = await compare(dto.password, user.password!);
      if (!isMatch) throw new ForbiddenException("Неверный старый пароль");

      user.password = await hash(dto.new_password, 10);
      delete dto.password;
    }

    if (profile_picture?.startsWith("data:image")) {
      profile_picture =
        await this.imageService.saveBase64Image(profile_picture);
      user.profile_picture = profile_picture;
    }

    Object.assign(user, dto);

    await this.userRepository.save(user);
  }

  async getUserById(user_id: string): Promise<TExtendedUser> {
    const user = await this.userRepository.findOne({
      where: { user_id },
      relations: ["followers"],
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${user_id} не найден`);
    }

    const followersCount = await this.followerRepository.count({
      where: { followed: { user_id } },
    });

    return { ...user, followersCount };
  }

  async getUserPosts(
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
      .where("post.user.user_id = :user_id", { user_id })
      .orderBy("post.creation_date", "DESC", "NULLS LAST");

    // Фильтрация по тексту (в заголовке или контенте)
    if (query.trim()) {
      queryBuilder.andWhere(
        "post.title ILIKE :query OR post.content ILIKE :query",
        {
          query: `%${query}%`,
        },
      );
    }

    // Фильтрация по тегам
    if (tags.length > 0) {
      queryBuilder.andWhere("tag.name IN (:...tags)", { tags });
    }

    // Пагинация
    const [posts, total] = await queryBuilder
      .orderBy("post.creation_date", "DESC")
      .skip(offset)
      .take(LIMIT)
      .getManyAndCount();

    return {
      totalPages: Math.ceil(total / LIMIT),
      totalPosts: total,
      page,
      posts: posts.map((post: Post) => ({
        article_id: post.article_id,
        user_id: post.user.user_id,
        title: post.title,
        creation_date: post.creation_date,
        content: post.content,
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

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  // FOLLOW

  async followUser(user_id: string, followed_id: string): Promise<void> {
    if (user_id === followed_id) {
      throw new BadRequestException("Нельзя подписаться на самого себя");
    }

    const follower = await this.userRepository.findOne({ where: { user_id } });
    const followed = await this.userRepository.findOne({
      where: { user_id: followed_id },
    });

    if (!follower || !followed) {
      throw new NotFoundException("Пользователь не найден");
    }

    try {
      const follow = this.followerRepository.create({ followed, follower });
      await this.followerRepository.save(follow);
    } catch (error: unknown) {
      if (
        error instanceof QueryFailedError &&
        "code" in error &&
        error.code === "23505"
      ) {
        throw new ConflictException("Вы уже подписаны на этого пользователя");
      }
      throw error;
    }
  }

  async unfollowUser(follower_id: string, followed_id: string): Promise<void> {
    if (follower_id === followed_id) {
      throw new BadRequestException("Нельзя отписаться от самого себя");
    }

    const follow = await this.followerRepository.findOne({
      where: {
        follower: { user_id: follower_id },
        followed: { user_id: followed_id },
      },
      relations: ["follower_id", "followed_id"],
    });

    if (!follow) {
      throw new NotFoundException("Вы не подписаны на этого пользователя");
    }

    await this.followerRepository.remove(follow);
  }

  async isFollowing(user_id: string, target_id: string): Promise<boolean> {
    const follow = await this.followerRepository.findOne({
      where: { follower: { user_id }, followed: { user_id: target_id } },
    });
    return !!follow;
  }

  async isBookmarked(user_id: string, post_id: string): Promise<boolean> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { user: { user_id }, post: { article_id: post_id } },
    });
    return !!bookmark;
  }
}
