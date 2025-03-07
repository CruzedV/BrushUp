"use client";

import { Button, Card } from 'antd';
import styles from './styles.module.scss';
import { useState } from 'react';
import InputItem from '@/components/common/InputItem';
import { ESettings } from '@/variants/settings';
import { EAvatar } from '@/variants/avatar';
import Avatar from '../Avatar';
import { PlusOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/user';
import { requestWithReturn } from '@/helpers/functions/requestWithReturn';
import { postComment } from '@/api/comments';
import { TPostComment } from '@shared/types/comment';
import { useMessages } from '@/helpers/hooks/useMessages';
import { TComment } from '@/types/comment';

type TProps = {
  article_id: string;
  setData: (value: TComment) => void;
}

const WriteComment = ({ article_id, setData }: TProps) => {
  const user = useUserStore((store) => store.user);
  const [value, setValue] = useState<string>('');
  const { errorMessage, successMessage} = useMessages();
  const [isLoading, setIsLoading] = useState(false);

  const fetchWriteComment = async () => {
    const prepData: TPostComment = {
      text: value,
      article_id,
    }
    const response = await requestWithReturn<TPostComment, TComment>(
      postComment,
      prepData,
      errorMessage,
      undefined,
      setIsLoading,
    )
    if (response) {
      successMessage("Комментарий оставлен!");
      setValue('');
      setData(response)
    }
  };

  return (
    <Card className={styles.writeComment}>
      <Avatar
        user={user}
        variant={EAvatar.small}
        action={
          <Button
            type="primary"
            disabled={value.length < 1}
            onClick={fetchWriteComment}
            loading={isLoading}
          >
            <PlusOutlined />
            Оставить комментарий
          </Button>
        }
      />
      <div className={styles.writeCommentInput}>
        <InputItem
          defaultValue={value}
          onChange={setValue}
          placeholder="Текст комментария"
          variant={ESettings.textarea}
          rows={2}
        />
      </div>
    </Card>
  );
};

export default WriteComment;