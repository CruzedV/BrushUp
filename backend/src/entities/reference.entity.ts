import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("imagereferences")
export class ImageReference {
  @PrimaryGeneratedColumn("uuid")
  reference_id: string;

  @Column("text")
  image_url: string;

  @OneToMany(() => ReferenceTag, (referenceTag) => referenceTag.reference)
  reference_tags: ReferenceTag[];
}

@Entity("imagetags")
export class ImageTag {
  @PrimaryGeneratedColumn("uuid")
  tag_id: string;

  @Column({ type: "varchar", length: 50, unique: true })
  name: string;

  @OneToMany(() => ReferenceTag, (referenceTag) => referenceTag.tag)
  reference_tags: ReferenceTag[];
}

@Entity("referencetags")
export class ReferenceTag {
  @PrimaryColumn("uuid")
  tag_id: string;

  @PrimaryColumn("uuid")
  reference_id: string;

  @ManyToOne(() => ImageTag, (tag) => tag.reference_tags, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "tag_id" })
  tag: ImageTag;

  @ManyToOne(() => ImageReference, (reference) => reference.reference_tags, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "reference_id" })
  reference: ImageReference;
}
