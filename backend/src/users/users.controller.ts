import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
  Put,
  UseGuards,
  Req,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { RegisterDto } from "src/dto/register.dto";
import { User } from "src/entities/user.entity";
import { UpdateUserDto } from "src/dto/user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { TRequestBody } from "@shared/types/tokens";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Создание пользователя сделать только для админа
  @Post()
  async createUser(@Body() registerDto: RegisterDto): Promise<User> {
    return this.userService.createUser(registerDto);
  }

  @Delete("self-delete")
  @UseGuards(AuthGuard)
  async deleteUser(@Req() req: TRequestBody) {
    return this.userService.deleteUser(req.user.user_id);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: TRequestBody,
  ) {
    return this.userService.updateUser(req.user.user_id, updateUserDto);
  }

  // Получение пользователя по ID
  @Get(":id")
  async getUserById(@Param("id", ParseIntPipe) user_id: number): Promise<User> {
    return this.userService.getUserById(user_id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post("follow/:id")
  @UseGuards(AuthGuard)
  async followUser(
    @Param("id") followed_id: number,
    @Req() req: TRequestBody,
  ): Promise<void> {
    return this.userService.followUser(req.user.user_id, followed_id);
  }

  @Delete("unfollow/:id")
  @UseGuards(AuthGuard)
  async unfollowUser(
    @Param("id") followed_id: number,
    @Req() req: TRequestBody,
  ) {
    await this.userService.unfollowUser(req.user.user_id, followed_id);
    return { message: "Вы отписались от пользователя" };
  }
}
