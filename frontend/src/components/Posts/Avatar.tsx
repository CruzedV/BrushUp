"use client"; 

import { Image } from 'antd';
import styles from './styles.module.scss';
import { EAvatar } from '@/variants/avatar';
import React from 'react';
import { TUser } from '@/types/user';
import { TPostUser } from '@shared/types/user';
import { useRouter } from 'next/navigation';
import { IMAGE_PREFIX } from '@shared/config';

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
  const router = useRouter();
  return (
    <div className={`${styles.avatar} ${styles[variant]}`}>
      <div
        className={styles.user}
        onClick={() => router.push(`/user/${user?.user_id}`)}
      >
        <Image
          alt="User avatar"
          src={user?.profile_picture || IMAGE_PREFIX+"/Avatar.png"}
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