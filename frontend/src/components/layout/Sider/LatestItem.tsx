"use client";

import { Button, Card, Divider } from "antd";
import styles from './styles.module.scss';
import TagGroup from "@/components/Tags/TagGroup";
import { TPost } from "@shared/types/post";
import parse from "html-react-parser";
import Avatar from "@/components/Posts/Avatar";
import { EAvatar } from "@/variants/avatar";
import { formatDate } from "@/helpers/functions/formatDate";

type TProps = {
  post: TPost;
}

const LatestItem = ({ post }: TProps) => {
  return (
    <article>
      <Card className={styles.latestItem}>
        <Avatar
          user={post.user}
          variant={EAvatar.small}
          action={
            <span>
              {formatDate(post.creation_date.toString())}
            </span>
          }
        />
        <h4>{post.title}</h4>
        {post.tags.length > 0 && (
          <TagGroup tags={post.tags} />
        )}
        <Divider />
        <div className={styles.latestItemContent}>
          {parse(post.content)}
        </div>
        <Button onClick={() => window.open(`/posts/${post.article_id}`)}>
          Читать
        </Button>
      </Card>
    </article>
  );
};

export default LatestItem;
