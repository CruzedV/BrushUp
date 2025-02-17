import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn()
  tag_id: number;

  @Column({ type: "varchar", length: 60 })
  name: string;

  @Column({ type: "varchar", length: 7 })
  color: string;
}
