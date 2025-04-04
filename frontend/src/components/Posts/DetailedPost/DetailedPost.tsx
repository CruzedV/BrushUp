import { Card, Divider, Image } from "antd"
import styles from './styles.module.scss';
import TagGroup from "../../Tags/TagGroup";
import Avatar from "../Avatar";
import CommentBlock from "../Comment/CommentBlock";
import { EAvatar } from "@/variants/avatar";
import { TDetailedPost } from "@/types/post";
import parse from "html-react-parser";

import PostActions from "./PostActions";
import DetailedPostHeader from "./DetailedPostHeader";
import { IMAGE_PREFIX } from "@shared/config";

type TProps = {
  post: TDetailedPost | null;
}

const DetailedPost = ({ post }: TProps) => {
  if (!post) {
    return (
      <span>Пост не найден</span>
    )
  }

  return (
    <>
      <article className={styles.post}>
        <Card>
          <div className={styles.header}>
            <Avatar
              user={post.user}
              variant={EAvatar.article}
              action={<PostActions post={post} />}
            />
            <DetailedPostHeader title={post.title} />
            <TagGroup tags={post.tags}/>
          </div>
          <Divider />
          <div className={`${styles.body} ${styles.detailedBody}`}>
            {post.cover && (
              <Image
                itemProp="image"
                alt="Post cover image"
                src={IMAGE_PREFIX+post.cover}
              />
            )}
            <span>{parse(post.content)}</span>
          </div>
        </Card>
      </article>
      <Divider />
      <CommentBlock post={post} />
    </>
  );
};

export default DetailedPost;