import { Button, Image, Upload } from 'antd';
import styles from './styles.module.scss';

const EditAvatar = () => {
  return (
    <div className={styles.editAvatar}>
      <Image alt="Edit User avatar" src="/Avatar.png" />
      <Upload>
          <Button>Изменить изображение профиля</Button>
      </Upload>
    </div>
  )
};

export default EditAvatar;