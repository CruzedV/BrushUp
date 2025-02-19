import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { RegisterDto } from "src/dto/register.dto";
import { User } from "src/entities/user.entity";
import { TFollowUser } from "@shared/types/follower";
import { UpdateUserDto } from "src/dto/user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Создание пользователя сделать только для админа
  @Post()
  async createUser(@Body() registerDto: RegisterDto): Promise<User> {
    return this.userService.createUser(registerDto);
  }

  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
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

  @Post("follow")
  async followUser(@Body() followeUserDto: TFollowUser): Promise<void> {
    return this.userService.followUser(followeUserDto);
  }

  @Delete("unfollow")
  async unfollowUser(@Body() followUserDto: TFollowUser) {
    await this.userService.unfollowUser(followUserDto);
    return { message: "Вы отписались от пользователя" };
  }
}
