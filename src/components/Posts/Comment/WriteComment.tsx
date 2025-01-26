import { Button, Card } from 'antd';
import styles from './styles.module.scss';
import { useState } from 'react';
import InputItem from '@/components/common/InputItem';
import { ESettings } from '@/variants/settings';
import { EAvatar } from '@/variants/avatar';
import Avatar from '../Avatar';
import { PlusOutlined } from '@ant-design/icons';

const WriteComment = () => {
  const [value, setValue] = useState<string>('');

  return (
    <Card className={styles.writeComment}>
      <Avatar
        variant={EAvatar.small}
        action={
          <Button type="primary">
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