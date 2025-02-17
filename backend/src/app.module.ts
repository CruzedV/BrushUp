import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { User } from "./entities/user.entity";
import { Post } from "./entities/posts.entity";
import { Follower } from "./entities/followers.entity";
import { UserModule } from "./users/users.module";
import { Token } from "./entities/token.entity";
import { AuthModule } from "./auth/auth.module";
import { Tag } from "./entities/tags.entity";
import { Comment } from "./entities/comment.entity";
import { Bookmark } from "./entities/bookmark.entity";
import { TagsModule } from "./tags/tags.module";
import { CommentsModule } from "./comments/comments.module";
import { BookmarksModule } from "./bookmarks/bookmarks.module";
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
      entities: [User, Post, Follower, Token, Tag, Comment, Bookmark],
    }),
    PostsModule,
    UserModule,
    AuthModule,
    TagsModule,
    BookmarksModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
