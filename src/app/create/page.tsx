import InputItem from "@/components/common/Inputtem";
import { Card, Button, Divider } from "antd";
import CoverUpload from "./CoverUpload";
import Editor from "./Editor";
import TagsInput from "./TagsInput";
import styles from './styles.module.scss';

const CreatePage = () => {
  return (
    <Card className={styles.createPage}>
      <InputItem title="Название статьи" defaultValue="" />
      <Divider />
      <CoverUpload />
      <Divider />
      <Editor />
      <Divider />
      <TagsInput />
      <Divider />
      <Button type="primary">Опубликовать</Button>
    </Card>
  )
};

export default CreatePage;