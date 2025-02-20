import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { Follower } from "src/entities/followers.entity";
import { RegisterDto } from "src/dto/register.dto";
import { TExtendedUser } from "src/dto/user.dto";
import { UpdateUserDto } from "src/dto/user.dto";
import { hash, compare } from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,
  ) {}

  async createUser(registerDto: RegisterDto): Promise<User> {
    const user = this.userRepository.create(registerDto);
    return this.userRepository.save(user);
  }

  async deleteUser(user_id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${user_id} не найден`);
    }

    await this.followerRepository.delete({ followed: { user_id } });
    await this.followerRepository.delete({ follower: { user_id } });

    await this.userRepository.remove(user);
  }

  async updateUser(user_id: number, dto: UpdateUserDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
      select: ["user_id", "password"],
    });
    if (!user) throw new NotFoundException("Пользователь не найден");

    if (dto.password && dto.new_password) {
      const isMatch = await compare(dto.password, user.password!);
      if (!isMatch) throw new ForbiddenException("Неверный старый пароль");

      user.password = await hash(dto.new_password, 10);
      delete dto.password;
    }

    Object.assign(user, dto);

    await this.userRepository.save(user);
  }

  async getUserById(user_id: number): Promise<TExtendedUser> {
    const user = await this.userRepository.findOne({
      where: { user_id },
      relations: ["posts", "followers"],
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${user_id} не найден`);
    }

    const followersCount = await this.followerRepository.count({
      where: { followed: { user_id } },
    });

    return { ...user, followersCount };
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  // FOLLOW

  async followUser(user_id: number, followed_id: number): Promise<void> {
    if (user_id === followed_id) {
      throw new BadRequestException("Нельзя подписаться на самого себя");
    }

    const follower = await this.userRepository.findOne({
      where: { user_id: user_id },
    });
    const followed = await this.userRepository.findOne({
      where: { user_id: followed_id },
    });

    if (!follower || !followed) {
      throw new NotFoundException("Пользователь не найден");
    }

    const follow = this.followerRepository.create({
      followed: followed,
      follower: follower,
    });
    await this.followerRepository.save(follow);
  }

  async unfollowUser(follower_id: number, followed_id: number): Promise<void> {
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
}
