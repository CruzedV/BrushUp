'use client';

import type { FormProps } from 'antd';
import { useEffect, useState } from 'react';
import { requestWithReturn } from '@/helpers/functions/requestWithReturn';
import { TCreatePost, TPost } from '@shared/types/post';
import { createPost, getPostById, updatePost } from '@/api/posts';
import { useMessages } from '@/helpers/hooks/useMessages';
import { redirect, useSearchParams } from 'next/navigation';
import PostCreateForm from './PostCreateForm';

const CreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<TCreatePost | null>(null);
  const { errorMessage, contextHolder } = useMessages();
  const article_id = useSearchParams()?.get("article_id");

  const fetchPost = async (article_id: string) => {
    const response = await requestWithReturn<string, TCreatePost | null>(
      getPostById,
      article_id,
      errorMessage,
      setPost,
      setIsLoading,
    )
    return response;
  };
  useEffect(() => {
    if (article_id) fetchPost(article_id);
  }, [])

  const onFinishCreating: FormProps<TCreatePost>['onFinish'] = async (values) => {
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
  
  const onFinishFailedCreating = () => {
    errorMessage("Ошибка при создании поста");
  };

  const onFinishUpdating: FormProps<TCreatePost>['onFinish'] = async (values) => {
    const response = await requestWithReturn<TCreatePost, TPost>(
      updatePost,
      values,
      errorMessage,
      undefined,
      setIsLoading,
    )
    if (response) {
      redirect(`/posts/${response.article_id}`)
    }
  }

  const onFinishFailedUpdating = () => {
    errorMessage("Ошибка при обновлении поста");
  };

  return (
    <>
      {contextHolder}
      {!article_id ? (
        <PostCreateForm
           isLoading={isLoading}
           onFinish={onFinishCreating}
           onFinishFailed={() => onFinishFailedCreating}
        />
      ) : (
        <PostCreateForm
          isLoading={isLoading}
          onFinish={onFinishUpdating}
          onFinishFailed={() => onFinishFailedUpdating}
          initialValues={post ? post : undefined}
        />
      )}
    </>
  )
};

export default CreatePage;
