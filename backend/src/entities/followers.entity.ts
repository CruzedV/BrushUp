import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { User } from "./user.entity";

@Entity("followers")
@Unique(["follower", "followed"])
export class Follower {
  @PrimaryGeneratedColumn("uuid")
  follow_id: string;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: "followed_id" })
  followed: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "follower_id" })
  follower: User;
}
