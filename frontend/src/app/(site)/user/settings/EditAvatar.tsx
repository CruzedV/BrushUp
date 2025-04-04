import { Button, Image, Upload } from 'antd';
import styles from './styles.module.scss';
import { IMAGE_PREFIX } from '@shared/config';

type TProps = {
  profile_picture: string;
}

const EditAvatar = ({ profile_picture }: TProps) => {
  return (
    <div className={styles.editAvatar}>
      <Image
        alt="Edit User avatar"
        src={profile_picture || IMAGE_PREFIX + "/Avatar.png"}
      />
      <Upload>
          <Button>Изменить изображение профиля</Button>
      </Upload>
    </div>
  )
};

export default EditAvatar;