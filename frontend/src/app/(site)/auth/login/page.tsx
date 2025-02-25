'use client';

import type { FormProps } from 'antd';
import { Button, Card, Form, Input, message } from 'antd';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { TLoginData } from '@/types/auth';
import { loginUser } from '@/api/auth';
import { requestWithReturn } from 'helpers/requestWithReturn';
import { TReturnToken } from '@/types/tokens';
import { getUserById } from '@/api/users';
import { TUser } from '@/types/user';
import { useUserStore } from 'store/user';
import { getUserFromToken } from 'helpers/getUserIdFromToken';


const LoginPage = () => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();
  const setUser = useUserStore((state) => state.setUser)

  const onFinish: FormProps<TLoginData>['onFinish'] = async (values) => {
    const response = await requestWithReturn<TLoginData, TReturnToken>(loginUser, values);
    if (response) {
      const user_id = getUserFromToken(response.token)?.user_id;
      if (user_id) {
        const user = await requestWithReturn<number, TUser>(getUserById, user_id);
        if (user) {
          setUser(user);
          localStorage.setItem("token", response.token);
          
        } else {
          message.error('Ошибка при получении пользователя');
        }
      } else {
        message.error('Ошибка при определении пользователя');
      }
    } else {
      message.error('Ошибка при запросе входа');
    }
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