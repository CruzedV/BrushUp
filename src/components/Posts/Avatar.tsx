import { Image } from 'antd';
import styles from './styles.module.scss';
import { EAvatar } from '@/variants/avatar';
import React from 'react';

type TProps = {
  variant?: EAvatar;
  action?: React.ReactNode;
};

const Avatar = ({ variant = EAvatar.normal, action }: TProps) => {
  return (
    <div className={`${styles.avatar} ${styles[variant]}`}>
      <div
        className={styles.user}
        onClick={() => window.open('/user/1')}
      >
        <Image alt="User avatar" src="/Avatar.png" preview={false} />
        <span>HairBall2D</span>
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