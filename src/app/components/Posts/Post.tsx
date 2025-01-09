"use client";

import { Button, Card, Image } from "antd"
import styles from './styles.module.scss';
import TagGroup from "../common/TagGroup";
import Avatar from "./Avatar";

const Post = () => {
  const handleOpenPost = () => {
    window.open('/1');
  };

  return (
    <article className={styles.post}>
      <Card>
        <div className={styles.header}>
          <Avatar />
          <Button type="link" onClick={handleOpenPost}>
            Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи
          </Button>
          <TagGroup />
        </div>
        <div className={styles.body}>
          <Image alt="Post cover image" src="./BG.png" />
          <span>
            Текст статьи Текст статьи
            Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
            Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
            Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
          </span>
          <Button type="primary" onClick={handleOpenPost}>
            Читать статью
          </Button>
        </div>
      </Card>
    </article>
  )
};

export default Post;