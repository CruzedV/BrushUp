"use client";

import { Button, Card, Image } from "antd"
import styles from './styles.module.scss';
import TagGroup from "../Tags/TagGroup";
import Avatar from "./Avatar";
import { EAvatar } from "@/variants/avatar";
import variables from "@/variables.module.scss";
import { TPost } from "@shared/types/post";

type TProps = {
  data: TPost;
}

const Post = ({ data }: TProps) => {
  const handleOpenPost = () => {
    window.open(`/posts/${data.article_id}`);
  };

  return (
    <article itemScope className={styles.post}>
      <Card>
        <div className={styles.header}>
          <Avatar
            variant={EAvatar.article}
            action={
              <span>
                Дата публикации: {}
                <b style={{color: variables.primaryColor}}>
                  {data.creation_date.toDateString()}
                </b>
              </span>
            }
          />
          <Button itemProp="headline" type="link" onClick={handleOpenPost}>
            {data.title}
          </Button>
          <TagGroup tags={data.tags} />
        </div>
        <div className={styles.body}>
          <Image
            itemProp="image"
            alt="Post cover image"
            src={data.cover ? data.cover : "/BG.png"}
          />
          <span>{data.content}</span>
          <Button type="primary" onClick={handleOpenPost}>
            Читать статью
          </Button>
        </div>
      </Card>
    </article>
  )
};

export default Post;