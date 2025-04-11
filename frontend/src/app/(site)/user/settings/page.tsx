"use client"

import styles from './styles.module.scss';
import { Button, Card, Divider, Form, FormProps, Input } from "antd";
import EditAvatar from "./EditAvatar";
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import PageTitle from '@/components/common/PageTitle';
import { useUserStore } from '@/store/user';
import { TUpdateUser, TUser } from '@/types/user';
import { requestWithReturn } from '@/helpers/functions/requestWithReturn';
import { updateUser } from '@/api/users';
import { useEffect, useState } from 'react';
import { useMessages } from '@/helpers/hooks/useMessages';
import {
  emailRules,
  notRequiredPasswordRules,
  usernameRules,
} from '@/formsRules/userRules';
import TextArea from 'antd/es/input/TextArea';

const UserSettings = () => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const { errorMessage, successMessage, contextHolder } = useMessages();

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);

  const onFinishUpdating: FormProps<TUpdateUser>['onFinish'] = async (values) => {
    const response = await requestWithReturn<TUpdateUser, TUser>(
      updateUser,
      values,
      errorMessage,
      undefined,
      setIsLoading,
    )
    if (response) {
      setUser(response);
      successMessage("Данные успешно изменены");
    }
  }

  const onFinishFailedUpdating = () => {
    errorMessage("Ошибка при изменении данных пользователя");
  };

  if (!user) {
    return (
      <span>Пользователь не найден</span>
    )
  }

  return (
    <>
      {contextHolder}
      <Form
        onFinish={onFinishUpdating}
        onFinishFailed={onFinishFailedUpdating}
        form={form}
        className={styles.settingsForm}
        disabled={isLoading}
        initialValues={user}
      >
        <PageTitle>Настройки</PageTitle>
        <Card className={styles.settings}>
          <div className={styles.doubleRow}>
            <EditAvatar
              profile_picture={user.profile_picture}
            />
            <div className={styles.nextToAvatar}>
              <Form.Item<TUpdateUser>
                label="Имя пользователя"
                name="username"
                rules={usernameRules}
              >
                <Input />
              </Form.Item>
              <Form.Item<TUpdateUser>
                label="Почта"
                name="email"
                rules={emailRules}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <Form.Item
            name="bio"
            label="Обо мне"
          >
            <TextArea />
          </Form.Item>
          <Divider />
          <div className={styles.doubleRow}>
            <Form.Item<TUpdateUser>
              label="Старый пароль"
              name="password"
              rules={notRequiredPasswordRules}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<TUpdateUser>
              label="Новый пароль"
              name="new_password"
              rules={notRequiredPasswordRules}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <Divider />
          <div className={styles.doubleRow}>
            <Form.Item<TUpdateUser>>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!submittable}
                loading={isLoading}
              >
                <SaveOutlined />
                Сохранить настройки
              </Button>
            </Form.Item>
            <Form.Item<TUpdateUser>>
              <Button
                htmlType="reset"
                disabled={!submittable}
                loading={isLoading}
              >
                <CloseOutlined />
                Отменить настройки
              </Button>
            </Form.Item>
          </div>
        </Card>
      </Form>
    </>
  );
};

export default UserSettings;
