import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { User } from "./entities/user.entity";
import { Post } from "./entities/posts.entity";
import { Followers } from "./entities/followers.entity";
import { UserModule } from "./users/users.module";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "BrushUp",
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Post, Followers],
    }),
    PostsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
