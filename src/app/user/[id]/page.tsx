"use client"

import Avatar from '@/components/Posts/Avatar';
import styles from './styles.module.scss';
import { Button, Card } from 'antd';
import Post from '@/components/Posts/Post';
import { EAvatar } from '@/variants/avatar';

const UserPage = () => {
  return (
    <article className={styles.userPage}>
      <Card className={styles.userPageInfo}>
        <Avatar
          variant={EAvatar.big}
          action={<Button type="primary">Подписаться</Button>}  
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