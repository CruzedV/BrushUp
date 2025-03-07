'use client';

import type { FormProps } from 'antd';
import { Button, Card, Form, Input } from 'antd';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { TLoginData } from '@/types/auth';
import { loginUser } from '@/api/auth';
import { requestWithReturn } from '@/helpers/functions/requestWithReturn';
import { TReturnToken } from '@/types/tokens';
import { useUserStore } from '@/store/user';
import { useMessages } from '@/helpers/hooks/useMessages';
import { authUser } from '@/helpers/functions/auth/authUser';


const LoginPage = () => {
  const [submittable, setSubmittable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const setUser = useUserStore((state) => state.setUser)
  const { errorMessage, successMessage, contextHolder } = useMessages();

  const onFinish: FormProps<TLoginData>['onFinish'] = async (values) => {
    const response = await requestWithReturn<TLoginData, TReturnToken>(
      loginUser,
      values,
      errorMessage,
      undefined,
      setIsLoading,
    );
    if (response) {
      authUser(response, errorMessage, successMessage, setUser, setIsLoading);
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
    <>
      {contextHolder}
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        className={styles.authForm}
        layout="vertical"
        disabled={isLoading}
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
            <Button
              type="primary"
              htmlType="submit"
              disabled={!submittable}
              loading={isLoading}
            >
              Войти
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </>
  );
};

export default LoginPage;