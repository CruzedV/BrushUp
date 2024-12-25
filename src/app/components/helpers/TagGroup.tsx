// import { TTag } from "@/app/types/article"
import styles from "./styles.module.scss";
import { Tag } from "antd";

// type TProps = {
//   tags: TTag[];
// }

const TagGroup = () => (
  <div className={styles.tagGroup}>
    {/* {tags?.map((tag, index) => (
      <Tag color={tag.color} key={tag.tagId + index}>
        {tag.name}
      </Tag>
    ))} */}
    <Tag color="purple">Рисование</Tag>
    <Tag color="blue">Повторение</Tag>
    <Tag color="success">Изучение</Tag>
    <Tag color="red">Говорение</Tag>
    <Tag color="warning">Krita</Tag>
    <Tag color="purple">Photoshop</Tag>
    <Tag color="blue">IPad</Tag>
    <Tag color="success">Карандаши</Tag>
  </div>
)

export default TagGroup;