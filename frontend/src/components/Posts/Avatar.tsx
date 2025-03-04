import { Image } from 'antd';
import styles from './styles.module.scss';
import { EAvatar } from '@/variants/avatar';
import React from 'react';
import { TUser } from '@/types/user';
import { TPostUser } from '@shared/types/user';

type TProps = {
  user: TUser | TPostUser | null;
  variant?: EAvatar;
  action?: React.ReactNode;
};

const Avatar = ({
  user,
  variant = EAvatar.normal,
  action
}: TProps) => {
  return (
    <div className={`${styles.avatar} ${styles[variant]}`}>
      <div
        className={styles.user}
        onClick={() => window.open(`/user/${user?.user_id}`)}
      >
        <Image
          alt="User avatar"
          src={user?.profile_picture || "/Avatar.png"}
          preview={false}
        />
        <span itemProp={variant == EAvatar.article ? 'image' : ''}>
          {user?.username}
        </span>
      </div>
      {action && (
        <div className={styles.action}>
          {action}
        </div>
      )}
    </div>
  )
};

export default Avatar;