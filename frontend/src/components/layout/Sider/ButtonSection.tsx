"use client";

import {
  BookOutlined,
  EditOutlined,
  LockOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Tooltip } from "antd";
import { useUserStore } from "@/store/user";


const ButtonSection = () => {
  const user = useUserStore((state) => state.user)
  return (
    <div>
      <Tooltip title={user ? undefined : "Необходимо зарегистрироваться"}>
        <Button href="/create" type="primary" disabled={!user}>
          <EditOutlined />
          Написать пост
          {!user && <LockOutlined />}
        </Button>
      </Tooltip>
      {user && (
        <>
          <Button href={`/user/${user?.user_id}`}>
            <UserOutlined />
            Профиль пользователя
          </Button>
          <Button href="/user/settings"><SettingOutlined />
            Настройки
          </Button>
        </>
      )}
      <Divider />
      <Button href="/">Главная</Button>
      {user && (
        <>
          <Button href="/favorite">
            <BookOutlined />
            Закладки
          </Button>
          <Button href="/subs">
            <UserAddOutlined />
          Подписки
          </Button>
        </>
      )}
      <Button href="/references/generator">Референсы</Button>
    </div>
  )
}

export default ButtonSection;