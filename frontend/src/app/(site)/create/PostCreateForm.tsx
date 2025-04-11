import { TCreatePost } from "@shared/types/post";
import { useEffect, useState } from "react";
import { Card, Button, Divider, Input, Form } from 'antd';
import CoverUpload from "./CoverUpload";
import Editor from "./Editor";
import TagsInput from '@/components/Tags/TagsInput';
import styles from './styles.module.scss';

type TProps = {
  isLoading: boolean;
  onFinish: ((values: TCreatePost) => void) | undefined;
  onFinishFailed: () => void;
  initialValues?: TCreatePost;
}

const PostCreateForm = ({
  isLoading,
  onFinish,
  onFinishFailed,
  initialValues,
}: TProps) => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      className={styles.createPostForm}
      disabled={isLoading}
      initialValues={initialValues}
    >
      <Card className={styles.createPage}>
        <Form.Item<TCreatePost>
          label="Название статьи"
          name="title"
          rules={
            [
              { required: true, message: 'Укажите название поста'},
              { min: 15, message: "Минимальная длина 15 символов"},
            ]
          }
        >
          <Input />
        </Form.Item>
        <CoverUpload />
        <Divider />
        <Editor />
        <Divider />
        <TagsInput title="Теги для статьи" form={form}/>
        <Divider />
        <Form.Item<TCreatePost>>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!submittable}
            loading={isLoading}
          >
            Опубликовать
          </Button>
        </Form.Item>
      </Card>
    </Form>
  )

}

export default PostCreateForm;