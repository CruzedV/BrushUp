'use client';

import type { FormProps } from 'antd';
import { Button, Card, Form, Input } from 'antd';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { TLoginData } from '@/types/auth';
import { loginUser } from '@/api/auth';
import { requestWithReturn } from 'helpers/requestWithReturn';
import { TReturnToken } from '@/types/tokens';


const LoginPage = () => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish: FormProps<TLoginData>['onFinish'] = async (values) => {
    const response = await requestWithReturn<TLoginData, TReturnToken>(loginUser, values);
    if (response) {
      localStorage.setItem("token", response.token);
    }
    const user = await requestWithReturn<number, >
  };
  
  const onFinishFailed: FormProps<TLoginData>['onFinishFailed'] = (errorInfo) => {
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
        <Form.Item<TLoginData>
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
        
        <Form.Item<TLoginData>
          label="Пароль"
          name="password"
          rules={
            [
              { required: true, message: 'Введите пароль' },
              { min: 6, message: 'Минимальная длина 6 символов' }
            ]
          }
        >
          <Input.Password />
        </Form.Item>
        
        <Form.Item<TLoginData> className={styles.authSubmit}>
          <Button type="primary" htmlType="submit" disabled={!submittable}>
            Войти
          </Button>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default LoginPage;