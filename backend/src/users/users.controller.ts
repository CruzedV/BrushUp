import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { RegisterDto } from "src/dto/register.dto";
import { User } from "src/entities/user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Создание пользователя сделать только для админа
  @Post()
  async createUser(@Body() registerDto: RegisterDto): Promise<User> {
    return this.userService.createUser(registerDto);
  }

  // Получение пользователя по ID
  @Get(":id")
  async getUserById(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post(":id/follow")
  async followUser(
    @Param("id", ParseIntPipe) followedId: number,
    @Body("followerId", ParseIntPipe) followerId: number,
  ): Promise<void> {
    return this.userService.followUser(followerId, followedId);
  }

  @Delete(":id/unfollow")
  async unfollowUser(
    @Param("id", ParseIntPipe) followedId: number,
    @Body("followerId", ParseIntPipe) followerId: number,
  ) {
    await this.userService.unfollowUser(followerId, followedId);
    return { message: "Вы отписались от пользователя" };
  }
}
