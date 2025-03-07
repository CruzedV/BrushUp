import { Card } from 'antd';
import styles from '../styles.module.scss';
import Avatar from '../Avatar';
import { EAvatar } from '@/variants/avatar';
import { TComment } from '@/types/comment';

type TProps = {
  comment: TComment;
}

const Comment = ({ comment }: TProps) => {
  return (
    <Card className={styles.comment}>
      <Avatar variant={EAvatar.small} user={comment.user} />
      <div>
        <span>{comment.text}</span>
      </div>
    </Card>
  )
};

export default Comment;