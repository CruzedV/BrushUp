import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  articleId: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationDate: Date;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;
}
