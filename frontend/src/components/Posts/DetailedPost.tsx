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
import { getPostById } from "@/api/posts";
import { useMessages } from "helpers/hooks/useMessages";

type TProps = {
  article_id: number;
}

const DetailedPost = ({ article_id }: TProps) => {
  const [post, setPost] = useState<TPost | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { errorMessage } = useMessages();

  const fetchPost = async (article_id: number) => {
    const response = await requestWithReturn<number, TPost | null>(
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

  useEffect(() => {
    fetchPost(article_id);
  }, [article_id])

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click left button', e);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  const items: MenuProps['items'] = [
    {
      label: 'Редактировать пост',
      key: '1',
      icon: <EditOutlined />, 
    },
    {
      label: 'Удалить пост',
      key: '2',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const Action = (
    <div className={styles.postActions}>
      <Button type="primary" onClick={() => console.log('bookmark')}>
        <PlusOutlined /> В закладки
      </Button>
      <Dropdown.Button
        menu={menuProps}
        onClick={handleButtonClick}
      >
        Действия с постом
      </Dropdown.Button>
    </div>
  )

  if (notFound) {
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
                  variant={EAvatar.article}
                  action={Action}
                />
                <Button itemProp="headline" type="link">{post?.title}</Button>
                <TagGroup tags={[]}/>
              </div>
              <div className={`${styles.body}, ${styles.detailedBody}`}>
                <Image
                  itemProp="image"
                  alt="Post cover image"
                  src={post?.cover || "/BG.png"}
                />
                <span>{post?.content}</span>
              </div>
            </Card>
          </article>
          <Divider />
          <CommentBlock />
          </>
        )}
    </>
  )
};

export default DetailedPost;