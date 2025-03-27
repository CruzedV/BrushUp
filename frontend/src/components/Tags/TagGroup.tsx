"use client";

import { TTag } from "@shared/types/tag";
import styles from "./styles.module.scss";
import { Tag } from "antd";

type TProps = {
  tags: TTag[];
  onDelete?: (data: TTag) => void;
  emptyTagsText?: string;
};

const TagGroup = ({
  tags = [],
  onDelete = () => null,
  emptyTagsText
}: TProps) => {
  return (
    <div className={styles.tagGroup}>
      {tags.length > 0 ? (
        <>
          {tags.map((tag, index) => (
            <Tag
              key={tag.tag_id + index}
              closable={!!onDelete}
              onClose={
                (e) => {
                  e.preventDefault();
                  onDelete(tag);
                }
              }
              style={{
                "background": tag.color + "60",
                "borderColor": tag.color,
              }}
            >
              {tag.name}
            </Tag>
          ))}
        </>  
      ) : (
        <>
          {emptyTagsText &&
            <span className={styles.emptyTags}>
              {emptyTagsText}
            </span>
          }
        </>
      )}
    </div>
  );
}

export default TagGroup;