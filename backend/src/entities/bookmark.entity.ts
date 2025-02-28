import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Post } from "./posts.entity";

@Entity("bookmarks")
export class Bookmark {
  @PrimaryGeneratedColumn("uuid")
  bookmark_id: string;

  @ManyToOne(() => User, (user) => user.bookmarks, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Post, (post) => post.bookmarks, { onDelete: "CASCADE" })
  post: Post;
}
