import "../../../globals.scss";
import { Button, Card, Divider } from "antd";
import LatestItem from "./LatestItem";

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
          <Button href="/new" type="primary">Написать пост</Button>
          <Button href="/user/1">Профиль пользователя</Button>
          <Button href="/user/settings">Настройки</Button>
          <Divider />
          <Button href="/">Главная</Button>
          <Button href="/">Закладки</Button>
          <Button href="/subs">Подписки</Button>
          <Button href="/ref">Референсы</Button>
        </div>
      </Card>
    </div>
  )
};

export default Sider;
