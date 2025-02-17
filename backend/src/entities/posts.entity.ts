import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { Bookmark } from "./bookmark.entity";

@Entity("articles")
export class Post {
  @PrimaryGeneratedColumn()
  article_id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creation_date: Date;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.post, { cascade: true })
  bookmarks: Bookmark[];
}
