"use client";

import Avatar from '@/components/Posts/Avatar';
import styles from './styles.module.scss';
import { Button, Card, Spin } from 'antd';
import { EAvatar } from '@/variants/avatar';
import { UserAddOutlined } from '@ant-design/icons';
import PageTitle from '@/components/common/PageTitle';
import PostsListWithFeedback from '@/components/Posts/PostsList';
import { useEffect, useState } from 'react';
import { TUser } from '@/types/user';
import { useMessages } from 'helpers/hooks/useMessages';
import { getUserById } from '@/api/users';
import { requestWithReturn } from 'helpers/functions/requestWithReturn';
import { EPostList } from '@/enums/post';

type TProps = {
  id: string;
};

const UserProfileBody = ({ id }: TProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { errorMessage } = useMessages();

  const fetchUser = async (id: string) => {
    const response = await requestWithReturn<string, TUser | null>(
      getUserById,
      id,
      () => {
        errorMessage("Ошибка при получении пользователя");
        setNotFound(true);
      },
      setUser,
      setIsLoading,
    )
    return response;
  };
  
  useEffect(() => {
    fetchUser(id);
  }, [id])

  if (notFound || !user) {
    return (
      <span>Поьзователь не найден</span>
    )
  }

  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <article className={styles.userPage}>
          <PageTitle>Личная страница пользователя</PageTitle>
          <Card className={styles.userPageInfo}>
            <Avatar
              user={user}
              variant={EAvatar.big}
              action={
                <Button type="primary">
                  <UserAddOutlined />
                  Подписаться
                </Button>
              }  
            />
            <span>{user.bio}</span>
          </Card>
          <div className={styles.userPagePosts}>
            <span className={styles.userPagePostsTitle}>
              Посты пользователя
            </span>
            <PostsListWithFeedback variant={EPostList.USER} user_id={id} />
          </div>
        </article>
      )}
    </>
  );
};

export default UserProfileBody;
