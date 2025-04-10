'use client';

import { InboxOutlined } from '@ant-design/icons';
import { TCreatePost } from '@shared/types/post';
import type { UploadProps } from 'antd';
import { Form, Upload } from 'antd';

const CoverUpload = () => {
  const [form] = Form.useForm();

  const props: UploadProps = {
    multiple: false,
    showUploadList: true,
    beforeUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        file.base64 = e.target?.result;
      };
      reader.readAsDataURL(file);

      form.setFieldValue("cover", file.base64);
      return false;
    },
    onRemove() {
      form.setFieldValue("cover", "");
    },
  };

  return (
    <Form.Item<TCreatePost> name="cover">
      <Upload.Dragger
        {...props}
        maxCount={1}
        fileList={form.getFieldValue("cover")}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Загрузить обложку поста</p>
      </Upload.Dragger>
    </Form.Item>
  );
};

export default CoverUpload;