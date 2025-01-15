"use client"

import styles from './styles.module.scss';
import { Button, Card, Divider } from "antd";
import EditAvatar from "./EditAvatar";
import SettingsItem from './SettingsItem';
import { ESettings } from '@/variants/settings';

const UserSettings = () => {
  return (
    <Card className={styles.settings}>
      <div className={styles.doubleRow}>
        <EditAvatar />
        <div className={styles.nextToAvatar}>
          <SettingsItem title="Имя пользователя" defaultValue="HairBall2D" />
          <SettingsItem title="Почта" defaultValue="HairBall2D@meow.com" />
        </div>
      </div>
      <Divider />
      <SettingsItem title="Обо мне" variant={ESettings.textarea} defaultValue="Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя Описание профиля пользователя " />
      <Divider />
      <div className={styles.doubleRow}>
        <SettingsItem title="Старый пароль" variant={ESettings.password} defaultValue="hairball2d2d" />
        <SettingsItem title="Новый пароль" variant={ESettings.password} defaultValue="hairball2d2d" />
      </div>
      <Divider />
      <div className={styles.doubleRow}>
        <Button type="primary">Сохранить настройки</Button>
        <Button>Отменить настройки</Button>
      </div>
    </Card>
  );
};

export default UserSettings;
