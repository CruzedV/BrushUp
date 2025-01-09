import { Image } from 'antd';
import styles from './styles.module.scss';

const Avatar = () => {
  return (
    <div className={styles.avatar}>
      <Image alt="User avatar" src="./Avatar.png" preview={false} />
      <span>HairBall2D</span>
    </div>
  )
};

export default Avatar;