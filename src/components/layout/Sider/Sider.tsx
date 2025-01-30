import "../../../globals.scss";
import { Button, Card, Divider } from "antd";
import LatestItem from "./LatestItem";
import {
  BookOutlined,
  EditOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Sider = () => {
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
          <Button href="/create" type="primary"><EditOutlined /> Написать пост</Button>
          <Button href="/user/1"><UserOutlined /> Профиль пользователя</Button>
          <Button href="/user/settings"><SettingOutlined /> Настройки</Button>
          <Divider />
          <Button href="/">Главная</Button>
          <Button href="/favorite">
            <BookOutlined />
            Закладки
          </Button>
          <Button href="/subs">
            <UserAddOutlined />
            Подписки
          </Button>
          <Button href="/references/generator">Референсы</Button>
        </div>
      </Card>
    </div>
  )
};

export default Sider;
