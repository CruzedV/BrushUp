import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { Followers } from "src/entities/followers.entity";
import { CreateUserDto } from "src/dto/create-user.dto";
import { TExtendedUser } from "src/types/user";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Followers)
    private readonly followersRepository: Repository<Followers>, // 💡 ДОБАВИЛИ!
  ) {}

  // Создание пользователя
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async followUser(followerId: number, followedId: number): Promise<void> {
    if (followerId === followedId) {
      throw new BadRequestException("Нельзя подписаться на самого себя");
    }

    const follower = await this.userRepository.findOne({
      where: { userId: followerId },
    });
    const followed = await this.userRepository.findOne({
      where: { userId: followedId },
    });

    if (!follower || !followed) {
      throw new NotFoundException("Пользователь не найден");
    }

    const follow = this.followersRepository.create({ follower, followed });
    await this.followersRepository.save(follow);
  }

  // Получение пользователя по ID с подписчиками и постами
  async getUserById(userId: number): Promise<TExtendedUser> {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ["posts", "followers"],
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
    }

    const followersCount = await this.followersRepository.count({
      where: { followed: { userId } },
    });

    return { ...user, followersCount };
  }
}
