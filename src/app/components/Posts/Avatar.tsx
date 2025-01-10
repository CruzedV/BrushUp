import { Image } from 'antd';
import styles from './styles.module.scss';
import { EAvatar } from '@/app/variants/avatar';

type TProps = {
  variant?: EAvatar;
};

const Avatar = ({ variant = EAvatar.normal }: TProps) => {
  return (
    <div className={`${styles.avatar} ${styles[variant]}`}>
      <Image alt="User avatar" src="./Avatar.png" preview={false} />
      <span>HairBall2D</span>
    </div>
  )
};

export default Avatar;