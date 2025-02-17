import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { Followers } from "src/entities/followers.entity";
import { RegisterDto } from "src/dto/register.dto";
import { TExtendedUser } from "src/types/user";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Followers)
    private readonly followersRepository: Repository<Followers>,
  ) {}

  // Создание пользователя
  async createUser(registerDto: RegisterDto): Promise<User> {
    const user = this.userRepository.create(registerDto);
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${userId} не найден`);
    }

    await this.followersRepository.delete({ followed: { userId } });
    await this.followersRepository.delete({ follower: { userId } });

    await this.userRepository.remove(user);
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

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
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

  async unfollowUser(followerId: number, followedId: number): Promise<void> {
    if (followerId === followedId) {
      throw new BadRequestException("Нельзя отписаться от самого себя");
    }

    const follow = await this.followersRepository.findOne({
      where: {
        follower: { userId: followerId },
        followed: { userId: followedId },
      },
      relations: ["follower", "followed"],
    });

    if (!follow) {
      throw new NotFoundException("Вы не подписаны на этого пользователя");
    }

    await this.followersRepository.remove(follow);
  }
}
