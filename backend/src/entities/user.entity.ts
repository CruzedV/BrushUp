import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Follower } from "./followers.entity";
import { Post } from "./posts.entity";
import { Token } from "./token.entity";
import { Bookmark } from "./bookmark.entity";
import { Comment } from "./comment.entity";
// import { Exclude } from "class-transformer";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column({ type: "varchar", length: 50, unique: true })
  username: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email?: string;

  @Column({ select: false })
  password?: string;

  @Column({ type: "text", nullable: true })
  profile_picture: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @OneToMany(() => Follower, (follower) => follower.followed)
  followers?: Follower[];

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @OneToMany(() => Token, (token) => token.user, { cascade: true })
  tokens?: Token[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user, { cascade: true })
  bookmarks: Bookmark[];
}
