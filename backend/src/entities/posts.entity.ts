import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { Bookmark } from "./bookmark.entity";
import { Tag } from "./tags.entity";

@Entity("articles")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  article_id: string;

  @Column()
  user_id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creation_date: Date;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.post, { cascade: true })
  bookmarks: Bookmark[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: "articletags",
    joinColumn: { name: "article_id", referencedColumnName: "article_id" },
    inverseJoinColumn: { name: "tag_id", referencedColumnName: "tag_id" },
  })
  tags: Tag[];
}
