'use client';

import type { FormProps } from 'antd';
import { Button, Card, Form, Input } from 'antd';
import styles from '../login/styles.module.scss';
import { useEffect, useState } from 'react';
import { TRegisterData } from '@/types/auth';
import { requestWithReturn } from 'helpers/functions/requestWithReturn';
import { useMessages } from 'helpers/hooks/useMessages';
import { useUserStore } from '@/store/user';
import { registerUser } from '@/api/auth';
import { TReturnToken } from '@/types/tokens';
import { authUser } from 'helpers/functions/auth/authUser';

const RegisterPage = () => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const setUser = useUserStore((state) => state.setUser)
  const { errorMessage, successMessage, contextHolder } = useMessages();

  const onFinish: FormProps<TRegisterData>['onFinish'] = async (values) => {
    const response = await requestWithReturn<TRegisterData, TReturnToken>(
      registerUser,
      values,
      errorMessage,
      undefined,
      setIsLoading,
    );
    if (response) {
      authUser(response, errorMessage, successMessage, setUser, setIsLoading);
    }
  };
  
  const onFinishFailed: FormProps<TRegisterData>['onFinishFailed'] = (errorInfo) => {
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
          <Form.Item<TRegisterData>
              label="Почта"
              name="email"
              rules={
                [
                  { required: true, message: 'Введите почту' },
                  { type: 'email', message: 'Введена не корректная почта' }
                ]
              }
            >
              <Input.Password />
          </Form.Item>

          <Form.Item<TRegisterData>
            label="Имя пользователя"
            name="username"
            rules={
              [
                { required: true, message: 'Введите имя пользователя' },
                { min: 4, message: 'Минимальная длина 4 символа' }
              ]
            }
          >
            <Input />
          </Form.Item>
          
          <Form.Item<TRegisterData>
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
          
          <Form.Item<TRegisterData> className={styles.authSubmit}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!submittable}
              loading={isLoading}
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </>
  );
};

export default RegisterPage;