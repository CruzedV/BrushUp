import styles from '../styles.module.scss';
import Comment from './Comment';
import WriteComment from './WriteComment';

const CommentBlock = () => {
  return (
    <div className={styles.comments}>
      <span className={styles.commentsTitle}>
        Комментарии
      </span>
      <WriteComment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  )
};

export default CommentBlock;