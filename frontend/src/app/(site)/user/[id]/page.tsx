"use client"

import Avatar from '@/components/Posts/Avatar';
import styles from './styles.module.scss';
import { Button, Card } from 'antd';
import Post from '@/components/Posts/Post';
import { EAvatar } from '@/variants/avatar';
import { UserAddOutlined } from '@ant-design/icons';
import PageTitle from '@/components/common/PageTitle';

const UserPage = () => {
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
        <Post />
        <Post />
        <Post />
      </div>
    </article>
  )
};

export default UserPage;