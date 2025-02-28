import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Post } from "./posts.entity";

@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  tag_id: string;

  @Column({ type: "varchar", length: 50, unique: true })
  name: string;

  @Column({ type: "varchar", length: 7 })
  color: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
