"use client";

import { Button, Card, Divider, Image } from "antd"
import styles from './styles.module.scss';
import TagGroup from "../common/TagGroup";
import Avatar from "./Avatar";
import CommentBlock from "./Comment/CommentBlock";

const DetailedPost = () => {
  return (
    <>
      <article className={styles.post}>
        <Card>
          <div className={styles.header}>
            <Avatar />
            <Button type="link">
              Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи Название статьи
            </Button>
            <TagGroup />
          </div>
          <div className={`${styles.body}, ${styles.detailedBody}`}>
            <Image alt="Post cover image" src="./BG.png" />
            <span>
              Текст статьи Текст статьи
              Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
              Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
              Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
              Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
              Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
              Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
              Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
              Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
              Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
              Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
              Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи Текст статьи 
            </span>
          </div>
        </Card>
      </article>
      <Divider />
      <CommentBlock />
    </>
  )
};

export default DetailedPost;