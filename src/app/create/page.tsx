'use client';

import type { FormProps } from 'antd';
import { Card, Button, Divider, Input, Form } from 'antd';
import CoverUpload from "./CoverUpload";
import Editor from "./Editor";
import TagsInput from "./TagsInput";
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

type PostType = {
  userid: string; 
  title: string;
  content: string;
  cover: string;
  tags: string[];
};

const CreatePage = () => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish: FormProps<PostType>['onFinish'] = (values) => {
    console.log('Успех:', values);
  };
  
  const onFinishFailed: FormProps<PostType>['onFinishFailed'] = (errorInfo) => {
    console.log('Ошибка:', errorInfo);
  };

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
    >
      <Card className={styles.createPage}>
        <Form.Item<PostType>
          label="Название статьи"
          name="title"
          rules={[{ required: true, message: 'Укажите название поста'}]}
        >
          <Input />
        </Form.Item>
        <CoverUpload />
        <Divider />
        <Editor />
        <Divider />
        <TagsInput />
        <Divider />
        <Form.Item<PostType>>
          <Button type="primary" htmlType="submit" disabled={!submittable}>
            Опубликовать
          </Button>
        </Form.Item>
      </Card>
    </Form>
  )
};

export default CreatePage;
