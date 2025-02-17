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
  commentId: number;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "articleId" })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column("text")
  text: string;
}
