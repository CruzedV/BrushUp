"use client";

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const props: UploadProps = {
  name: 'file',
  multiple: false,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} успешно загружен`);
    } else if (status === 'error') {
      message.error(`${info.file.name} неуспешно загружен`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const CoverUpload = () => (
  <Upload.Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Загрузить обложку поста</p>
    <p className="ant-upload-hint">Размер не больше 2 МБ</p>
  </Upload.Dragger>
);

export default CoverUpload;