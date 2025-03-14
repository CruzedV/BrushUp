import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("tokens")
export class Token {
  @PrimaryGeneratedColumn("uuid")
  token_id: string;

  @ManyToOne(() => User, (user) => user.tokens, { onDelete: "CASCADE" })
  user: User;

  @Column({ type: "text", unique: true })
  token: string;

  @Column({ type: "timestamp" })
  expires: Date;
}
