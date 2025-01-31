'use client';

import type { FormProps } from 'antd';
import { Button, Card, Form, Input } from 'antd';
import styles from '../login/styles.module.scss';
import { useEffect, useState } from 'react';
import { RegisterType } from '@/types/auth';

const RegisterPage = () => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish: FormProps<RegisterType>['onFinish'] = (values) => {
    console.log('Успех:', values);
  };
  
  const onFinishFailed: FormProps<RegisterType>['onFinishFailed'] = (errorInfo) => {
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
        <Form.Item<RegisterType>
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

        <Form.Item<RegisterType>
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
        
        <Form.Item<RegisterType>
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
        
        <Form.Item<RegisterType> className={styles.authSubmit}>
          <Button type="primary" htmlType="submit" disabled={!submittable}>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default RegisterPage;