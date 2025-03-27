import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Query,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { RegisterDto } from "src/dto/register.dto";
import { User } from "src/entities/user.entity";
import { UpdateUserDto } from "src/dto/user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { TRequestBody } from "@shared/types/tokens";
import { TPostFilters, TResponsePosts } from "@shared/types/post";

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
  async getUserById(@Param("id") user_id: string): Promise<User> {
    return this.userService.getUserById(user_id);
  }

  @Post("user-posts/:id")
  async getUserPosts(
    @Query("page") page: number = 1,
    @Param("id") user_id: string,
    @Body() body: TPostFilters<string[]>,
  ): Promise<TResponsePosts> {
    return this.userService.getUserPosts(user_id, page, body.query, body.tags);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post("follow/:id")
  @UseGuards(AuthGuard)
  async followUser(
    @Param("id") followed_id: string,
    @Req() req: TRequestBody,
  ): Promise<void> {
    return this.userService.followUser(req.user.user_id, followed_id);
  }

  @Delete("unfollow/:id")
  @UseGuards(AuthGuard)
  async unfollowUser(
    @Param("id") followed_id: string,
    @Req() req: TRequestBody,
  ) {
    await this.userService.unfollowUser(req.user.user_id, followed_id);
    return { message: "Вы отписались от пользователя" };
  }

  @Post("is-following/:id")
  @UseGuards(AuthGuard)
  async checkIsFollowing(
    @Param("id") target_id: string,
    @Req() req: TRequestBody,
  ) {
    return await this.userService.isFollowing(req.user.user_id, target_id);
  }

  @Post("is-bookmarked/:id")
  @UseGuards(AuthGuard)
  async checkIsBookmarked(
    @Param("id") post_id: string,
    @Req() req: TRequestBody,
  ) {
    return await this.userService.isBookmarked(req.user.user_id, post_id);
  }
}
