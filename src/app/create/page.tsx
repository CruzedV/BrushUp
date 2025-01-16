import InputItem from "@/components/common/Inputtem";
import { Card, Button } from "antd";
import CoverUpload from "./CoverUpload";

const CreatePage = () => {
  return (
    <Card>
      <InputItem title="Название статьи" defaultValue=""/>
      <CoverUpload />
      <Button>Опубликовать</Button>
    </Card>
  )
};

export default CreatePage;