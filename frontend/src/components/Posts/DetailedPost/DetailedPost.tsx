import { Button, Card, Divider, Image } from "antd"
import styles from './styles.module.scss';
import TagGroup from "../../Tags/TagGroup";
import Avatar from "../Avatar";
import CommentBlock from "../Comment/CommentBlock";
import { EAvatar } from "@/variants/avatar";
import { TPost } from "@shared/types/post";

import PostActions from "./PostActions";

type TProps = {
  post: TPost | null;
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
            <Button itemProp="headline" type="link">{post.title}</Button>
            <TagGroup tags={[]}/>
          </div>
          <div className={`${styles.body}, ${styles.detailedBody}`}>
            {post.cover && (
              <Image
                itemProp="image"
                alt="Post cover image"
                src={post.cover}
              />
            )}
            <span>{post.content}</span>
          </div>
        </Card>
      </article>
      <Divider />
      <CommentBlock />
    </>
  );
};

export default DetailedPost;