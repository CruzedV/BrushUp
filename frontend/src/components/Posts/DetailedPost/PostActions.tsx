"use client";

import { TPost } from "@shared/types/post";
import { requestWithReturn } from "@/helpers/functions/requestWithReturn";
import { deletePost } from "@/api/posts";
import { useMessages } from "@/helpers/hooks/useMessages";
import { redirect } from "next/navigation";
import { useUserStore } from "@/store/user";
import { Button, Dropdown, type MenuProps } from "antd";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { markPost, unmarkPost } from "@/api/bookmarks";
import { TBookmark } from "@/types/bookmark";

type TProps = {
  post: TPost;
}

const PostActions = ({ post }: TProps) => {
  const [isMarked, setIsMarked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { errorMessage, successMessage } = useMessages();

  const user = useUserStore((state) => state.user);
  const isOwner = post?.user.user_id == user?.user_id;

  const fetchMarkPost = async () => {
    const response = await requestWithReturn<string, TBookmark>(
      markPost,
      post.article_id,
      errorMessage,
      undefined,
      setIsLoading,
    )
    if (response?.bookmark_id) {
      setIsMarked(true);
    }
  }

  const fetchUnmarkPost = async () => {
    const response = await requestWithReturn<string, number>(
      unmarkPost,
      post.article_id,
      errorMessage,
      undefined,
      setIsLoading,
    )
    if (response == 200) {
      setIsMarked(false);
    }
  }

  const fetchEditPost = () => {
    redirect(`/create?article_id=${post.article_id}`)
  }

  const fetchDeletePost = async () => {
    const status = await requestWithReturn<string, number>(
      deletePost,
      post.article_id,
      errorMessage,
    );
    if (status == 200) {
      successMessage("Пост удален успешно");
      setTimeout(() => redirect("/"), 200);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Редактировать пост',
      key: '1',
      icon: <EditOutlined />,
      onClick: fetchEditPost,
    },
    {
      label: 'Удалить пост',
      key: '2',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: fetchDeletePost,
    },
  ];

  const menuProps = {
    items,
  };

  return (
    <div className={styles.postActions}>
      {isMarked ? (
        <Button type="primary" onClick={fetchUnmarkPost} loading={isLoading}>
          <MinusOutlined /> Из закладок
        </Button>
      ) : (
        <Button type="primary" onClick={fetchMarkPost} loading={isLoading}>
          <PlusOutlined /> В закладки
        </Button>
      )}
      {isOwner && (
        <Dropdown.Button menu={menuProps}>
          Действия с постом
        </Dropdown.Button>
      )}
    </div>
  )
}

export default PostActions;