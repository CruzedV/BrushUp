// import { TTag } from "@/app/types/article"
import styles from "./styles.module.scss";
import { Tag } from "antd";

type TProps = {
  tags?: string[];
  onDelete?: (data: string) => void;
};

const TagGroup = ({ tags = [], onDelete = () => null }: TProps) => (
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
      <span>Нет тегов</span>
    )}
  </div>
)

export default TagGroup;