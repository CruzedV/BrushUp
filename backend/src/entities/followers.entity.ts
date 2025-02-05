import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Followers {
  @PrimaryGeneratedColumn()
  followerId: number;

  @ManyToOne(() => User, (user) => user.followers)
  followed: User;

  @ManyToOne(() => User)
  follower: User;
}
