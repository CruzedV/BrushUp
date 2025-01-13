import styles from '../styles.module.scss';
import Comment from './Comment';

const CommentBlock = () => {
  return (
    <div className={styles.comments}>
      <span className={styles.commentsTitle}>
        Комментарии
      </span>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  )
};

export default CommentBlock;