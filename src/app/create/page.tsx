'use client';

import type { FormProps } from 'antd';
import { Card, Button, Divider, Input, Form } from 'antd';
import CoverUpload from "./CoverUpload";
import Editor from "./Editor";
import TagsInput from "./TagsInput";
import styles from './styles.module.scss';

type PostType = {
  userid: string; 
  title: string;
  content: string;
  cover: string;
  tags: string[];
};

const CreatePage = () => {
  const [form] = Form.useForm();

  const onFinish: FormProps<PostType>['onFinish'] = (values) => {
    console.log('Успех:', values);
  };
  
  const onFinishFailed: FormProps<PostType>['onFinishFailed'] = (errorInfo) => {
    console.log('Ошибка:', errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Card className={styles.createPage}>
        <Form.Item<PostType>
          label={null}
          name="title"
          rules={[{ required: true, message: 'Укажите название поста'}]}
        >
          <div className={styles.settingsItem}>
            <span>Название статьи</span>
            <Input />
          </div>
        </Form.Item>
        <CoverUpload />
        <Divider />
        <Editor />
        <Divider />
        <TagsInput />
        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit">Опубликовать</Button>
        </Form.Item>
      </Card>
    </Form>
  )
};

export default CreatePage;
