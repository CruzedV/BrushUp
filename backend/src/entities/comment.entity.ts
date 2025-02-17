import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Post } from "./posts.entity";

@Entity("articlecomments")
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "article_id" })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column("text")
  text: string;
}
