import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";

@Entity("imagereferences")
export class ImageReference {
  @PrimaryGeneratedColumn("uuid")
  reference_id: string;

  @Column("text")
  image_url: string;

  @OneToMany(() => ReferenceTag, (referenceTag) => referenceTag.reference)
  referenceTags: ReferenceTag[];
}

@Entity("imagetags")
export class ImageTag {
  @PrimaryGeneratedColumn("uuid")
  tag_id: string;

  @Column({ type: "varchar", length: 50, unique: true })
  name: string;

  @OneToMany(() => ReferenceTag, (referenceTag) => referenceTag.tag)
  referenceTags: ReferenceTag[];
}

@Entity("referencetags")
export class ReferenceTag {
  @PrimaryColumn("uuid")
  tag_id: string;

  @PrimaryColumn("uuid")
  reference_id: string;

  @ManyToOne(() => ImageTag, (tag) => tag.referenceTags, {
    onDelete: "CASCADE",
  })
  tag: ImageTag;

  @ManyToOne(() => ImageReference, (reference) => reference.referenceTags, {
    onDelete: "CASCADE",
  })
  reference: ImageReference;
}
