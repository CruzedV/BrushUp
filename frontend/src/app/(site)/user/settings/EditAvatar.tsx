import { Button, Form, Image, Upload, UploadProps } from 'antd';
import styles from './styles.module.scss';
import { IMAGE_PREFIX } from '@shared/config';
import { TUpdateUser } from '@/types/user';

type TProps = {
  profile_picture: string;
}

const EditAvatar = ({ profile_picture }: TProps) => {
  const form = Form.useFormInstance();
  
  const props: UploadProps = {
    multiple: false,
    showUploadList: true,
    beforeUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        file.base64 = e.target?.result;
      };
      reader.readAsDataURL(file);

      return false;
    },
    onRemove() {
      form.setFieldValue("profile_picture", "");
    },
  };

  return (
    <div className={styles.editAvatar}>
      <Image
        alt="Edit User avatar"
        src={profile_picture || IMAGE_PREFIX + "/Avatar.png"}
      />
      <Form.Item<TUpdateUser> name="profile_picture">
        <Upload {...props}>
          <Button>Изменить изображение профиля</Button>
        </Upload>
      </Form.Item>
    </div>
  )
};

export default EditAvatar;
