"use client";

import { Button, Card, Divider, Image } from "antd"
import styles from './styles.module.scss';
import TagGroup from "../Tags/TagGroup";
import Avatar from "./Avatar";
import { EAvatar } from "@/variants/avatar";
import variables from "@/variables.module.scss";
import { TPost } from "@shared/types/post";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { formatDate } from "@/helpers/functions/formatDate";
import { IMAGE_PREFIX } from "@shared/config";

type TProps = {
  data: TPost;
}

const Post = ({ data }: TProps) => {
  const router = useRouter();
  const handleOpenPost = () => {
    router.push(`/posts/${data.article_id}`);
  };

  return (
    <article itemScope className={styles.post}>
      <Card>
        <div className={styles.header}>
          <Avatar
            user={data.user}
            variant={EAvatar.article}
            action={
              <span>
                Дата публикации: {}
                <b style={{color: variables.primaryColor}}>
                  {formatDate(data.creation_date.toString())}
                </b>
              </span>
            }
          />
          <Button itemProp="headline" type="text" onClick={handleOpenPost}>
            {data.title}
          </Button>
          <TagGroup tags={data.tags} />
        </div>
        <Divider />
        <div className={styles.body}>
          {data.cover && (
            <Image
              itemProp="image"
              alt="Post cover image"
              src={IMAGE_PREFIX+data.cover}
            />
          )}
          <span>{parse(data.content)}</span>
          <Button type="primary" onClick={handleOpenPost}>
            Читать статью
          </Button>
        </div>
      </Card>
    </article>
  )
};

export default Post;