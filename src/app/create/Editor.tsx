"use client";

import { useState } from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import styles from './styles.module.scss';
import { Form } from "antd";

const Editor = () => {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <Form.Item
      name="content"
      rules={
        [
          { required: true, message: 'Необходим текст поста'},
          // { min: 200, message: 'Не удовлетворяет минимальной длине'}
        ]
      }
    >
      <ReactQuill
        className={styles.editor}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
      /> 
    </Form.Item>
  );
};

export default Editor;