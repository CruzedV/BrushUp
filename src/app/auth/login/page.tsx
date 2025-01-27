'use client';

import type { FormProps } from 'antd';
import { Button, Card, Form, Input } from 'antd';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { LoginType } from '@/types/auth';


const LoginPage = () => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish: FormProps<LoginType>['onFinish'] = (values) => {
    console.log('Успех:', values);
  };
  
  const onFinishFailed: FormProps<LoginType>['onFinishFailed'] = (errorInfo) => {
    console.log('Ошибка:', errorInfo);
  };

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      className={styles.authForm}
      layout="vertical"
    >
      <Card className={styles.authCard}>
        <Form.Item<LoginType>
          label="Почта"
          name="email"
          rules={
            [
              { required: true, message: 'Введите почту' },
              { min: 4, message: 'Минимальная длина 4 символа' }
            ]
          }
        >
          <Input />
        </Form.Item>
        
        <Form.Item<LoginType>
          label="Пароль"
          name="password"
          rules={
            [
              { required: true, message: 'Введите пароль' },
              { min: 8, message: 'Минимальная длина 8 символов' }
            ]
          }
        >
          <Input.Password />
        </Form.Item>
        
        <Form.Item<LoginType> className={styles.authSubmit}>
          <Button type="primary" htmlType="submit" disabled={!submittable}>
            Войти
          </Button>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default LoginPage;