"use client";

import { TDetailedPost } from '@/types/post';
import styles from '../styles.module.scss';
import WriteComment from './WriteComment';
import CommentListWithFeedback from './CommentList';
import { useState } from 'react';
import { TComment } from '@/types/comment';

type TProps = {
  post: TDetailedPost;
}

const CommentBlock = ({ post }: TProps) => {
  const [data, setData] = useState<TComment[]>(post.comments);
  
  const setNewData = (value: TComment) => {
    setData((prevData) => [value, ...prevData]);
  };

  return (
    <div className={styles.comments}>
      <span className={styles.commentsTitle}>
        Комментарии
      </span>
      <WriteComment article_id={post.article_id} setData={setNewData} />
      <CommentListWithFeedback
        article_id={post.article_id}
        data={data}
      />
    </div>
  )
};

export default CommentBlock;