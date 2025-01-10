import { Card } from 'antd';
import styles from '../styles.module.scss';
import Avatar from '../Avatar';
import { EAvatar } from '@/app/variants/avatar';

const Comment = () => {
  return (
    <Card className={styles.comment}>
      <Avatar variant={EAvatar.small} />
      <div>
        <span>
          Текст комментария
          Текст комментария
          Текст комментария
          Текст комментария
          Текст комментария
        </span>
      </div>
    </Card>
  )
};

export default Comment;