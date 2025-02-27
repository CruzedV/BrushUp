'use client';

import "../../../globals.scss";
import { Button, Card, Divider, Tooltip } from "antd";
import LatestItem from "./LatestItem";
import {
  BookOutlined,
  EditOutlined,
  LockOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useUserStore } from "store/user";

const Sider = () => {
  const user = useUserStore((state) => state.user)
  console.log(user);

  return (
    <div className="sider">
      <Card className="siderLatest">
        <h3>Вам может быть интересно</h3>
        <div className="siderLatestList">
          <LatestItem />
          <LatestItem />
        </div>
      </Card>
      <Card className="siderActions">
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
      </Card>
    </div>
  )
};

export default Sider;
