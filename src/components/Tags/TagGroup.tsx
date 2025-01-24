// import { TTag } from "@/app/types/article"
import { useEffect } from "react";
import styles from "./styles.module.scss";
import { Tag } from "antd";

type TProps = {
  tags?: string[];
  onDelete?: (data: string) => void;
  emptyTagsText?: string;
};

const TagGroup = ({
  tags = [],
  onDelete = () => null,
  emptyTagsText
}: TProps) => {
  return (
    <div className={styles.tagGroup}>
      {/* {tags?.map((tag, index) => (
        <Tag color={tag.color} key={tag.tagId + index}>
          {tag.name}
        </Tag>
      ))} */}
      {tags.length > 0 ? (
        <>
          {tags.map((item, index) => (
            <Tag
              color="purple"
              key={index}
              closable={!!onDelete}
              onClose={
                (e) => {
                  e.preventDefault();
                  onDelete(item);
                }
              }
            >
              {item}
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