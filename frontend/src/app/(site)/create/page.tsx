'use client';

import type { FormProps } from 'antd';
import { Card, Button, Divider, Input, Form } from 'antd';
import CoverUpload from "./CoverUpload";
import Editor from "./Editor";
import TagsInput from '@/components/Tags/TagsInput';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { requestWithReturn } from 'helpers/functions/requestWithReturn';
import { TCreatePost, TPost } from '@shared/types/post';
import { createPost } from '@/api/posts';
import { useMessages } from 'helpers/hooks/useMessages';
import { redirect } from 'next/navigation';

const CreatePage = () => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { errorMessage } = useMessages();

  const onFinish: FormProps<TCreatePost>['onFinish'] = async (values) => {
    const response = await requestWithReturn<TCreatePost, TPost>(
      createPost,
      values,
      errorMessage,
      undefined,
      setIsLoading,
    )
    if (response) {
      redirect(`/posts/${response.article_id}`)
    }
  };
  
  const onFinishFailed: FormProps<TCreatePost>['onFinishFailed'] = (errorInfo) => {
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
      disabled={isLoading}
      initialValues={{
        tags: []
      }}
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
};

export default CreatePage;
