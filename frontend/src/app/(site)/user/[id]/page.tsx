import Avatar from '@/components/Posts/Avatar';
import styles from './styles.module.scss';
import { Button, Card } from 'antd';
import { EAvatar } from '@/variants/avatar';
import { UserAddOutlined } from '@ant-design/icons';
import PageTitle from '@/components/common/PageTitle';
import PostsListWithFeedback from '@/components/Posts/PostsList';
import { getUserPosts } from '@/api/posts';
import { useEffect, useState } from 'react';
import { TUser } from '@/types/user';
import { useMessages } from 'helpers/hooks/useMessages';
import { getUserById } from '@/api/users';
import { requestWithReturn } from 'helpers/functions/requestWithReturn';

const UserPage = async ({ params }: { params: { id: string }}) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { errorMessage } = useMessages();
  const { id } = await params;

  const fetchUser = async (id: string) => {
    const response = await requestWithReturn<string, TPost | null>(
      getUserById,
      id,
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
    fetchUser(id);
  }, [id])

  return (
    <article className={styles.userPage}>
      <PageTitle>Личная страница пользователя</PageTitle>
      <Card className={styles.userPageInfo}>
        <Avatar
          variant={EAvatar.big}
          action={
            <Button type="primary">
              <UserAddOutlined />
              Подписаться
            </Button>
          }  
        />
        <span>Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя </span>
      </Card>
      <div className={styles.userPagePosts}>
        <span className={styles.userPagePostsTitle}>
          Посты пользователя
        </span>
        <PostsListWithFeedback request={getUserPosts} />
      </div>
    </article>
  )
};

export default UserPage;