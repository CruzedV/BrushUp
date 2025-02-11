import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Post } from "./posts.entity";

@Entity("Bookmark")
export class Bookmark {
  @PrimaryGeneratedColumn()
  bookmarkId: number;

  @ManyToOne(() => User, (user) => user.bookmarks, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Post, (post) => post.bookmarks, { onDelete: "CASCADE" })
  post: Post;
}
