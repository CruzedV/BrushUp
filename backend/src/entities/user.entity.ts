import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Followers } from "./followers.entity";
import { Post } from "./posts.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: "varchar", length: 50, unique: true })
  username: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email?: string;

  @Column({ type: "varchar", length: 255 })
  password?: string;

  @Column({ type: "text", nullable: true })
  profilePicture: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @OneToMany(() => Followers, (follower) => follower.followed)
  followers?: Followers[];

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];
}
