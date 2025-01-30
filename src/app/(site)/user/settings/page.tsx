"use client"

import styles from './styles.module.scss';
import { Button, Card, Divider } from "antd";
import EditAvatar from "./EditAvatar";
import InputItem from '@/components/common/InputItem';
import { ESettings } from '@/variants/settings';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import PageTitle from '@/components/common/PageTitle';

const UserSettings = () => {
  return (
    <>
      <PageTitle>Настройки</PageTitle>
      <Card className={styles.settings}>
        <div className={styles.doubleRow}>
          <EditAvatar />
          <div className={styles.nextToAvatar}>
            <InputItem title="Имя пользователя" defaultValue="HairBall2D" />
            <InputItem title="Почта" defaultValue="HairBall2D@meow.com" />
          </div>
        </div>
        <Divider />
        <InputItem title="Обо мне" variant={ESettings.textarea} defaultValue="Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя " />
        <Divider />
        <div className={styles.doubleRow}>
          <InputItem title="Старый пароль" variant={ESettings.password} defaultValue="hairball2d2d" />
          <InputItem title="Новый пароль" variant={ESettings.password} defaultValue="hairball2d2d" />
        </div>
        <Divider />
        <div className={styles.doubleRow}>
          <Button type="primary">
            <SaveOutlined />
            Сохранить настройки
          </Button>
          <Button>
            <CloseOutlined />
            Отменить настройки
          </Button>
        </div>
      </Card>
    </>
  );
};

export default UserSettings;
