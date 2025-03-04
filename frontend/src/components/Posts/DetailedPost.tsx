"use client";

import { Button, Card, Divider, Dropdown, Image, Spin } from "antd"
import styles from './styles.module.scss';
import TagGroup from "../Tags/TagGroup";
import Avatar from "./Avatar";
import CommentBlock from "./Comment/CommentBlock";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { EAvatar } from "@/variants/avatar";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { TPost } from "@shared/types/post";
import { requestWithReturn } from "helpers/functions/requestWithReturn";
import { deletePost, getPostById } from "@/api/posts";
import { useMessages } from "helpers/hooks/useMessages";
import { redirect } from "next/navigation";
import { useUserStore } from "@/store/user";

type TProps = {
  article_id: string;
}

const DetailedPost = ({ article_id }: TProps) => {
  const [post, setPost] = useState<TPost | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { errorMessage, successMessage } = useMessages();
  const user = useUserStore((state) => state.user);

  const isOwner = post?.user.user_id == user?.user_id;

  const fetchPost = async (article_id: string) => {
    const response = await requestWithReturn<string, TPost | null>(
      getPostById,
      article_id,
      () => {
        errorMessage("Ошибка при получении поста");
        setNotFound(true);
      },
      setPost,
      setIsLoading,
    )
    return response;
  };

  const fetchDeletePost = async () => {
    const status = await requestWithReturn<string, number>(
      deletePost,
      article_id,
      errorMessage,
    );
    if (status == 200) {
      successMessage("Пост удален успешно");
      setTimeout(() => redirect("/"), 200);
    }
  };

  const fetchEditPost = () => {
    redirect(`/create?article_id=${article_id}`)
  }

  useEffect(() => {
    fetchPost(article_id);
  }, [article_id])

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

  const Action = (
    <div className={styles.postActions}>
      <Button type="primary" onClick={}>
        <PlusOutlined /> В закладки
      </Button>
      {isOwner && (
        <Dropdown.Button menu={menuProps}>
          Действия с постом
        </Dropdown.Button>
      )}
    </div>
  )

  if (notFound || !post) {
    return (
      <span>Пост не найден</span>
    )
  }

  return (
    <>
        {isLoading ? (
          <Spin />
        ) : (
          <>
            <article className={styles.post}>
              <Card>
                <div className={styles.header}>
                  <Avatar
                    user={post.user}
                    variant={EAvatar.article}
                    action={Action}
                  />
                  <Button itemProp="headline" type="link">{post.title}</Button>
                  <TagGroup tags={[]}/>
                </div>
                <div className={`${styles.body}, ${styles.detailedBody}`}>
                  {post.cover && (
                    <Image
                      itemProp="image"
                      alt="Post cover image"
                      src={post.cover}
                    />
                  )}
                  <span>{post.content}</span>
                </div>
              </Card>
            </article>
            <Divider />
            <CommentBlock />
          </>
        )}
    </>
  );
};

export default DetailedPost;