"use client";

// import { Button, Divider } from "antd";
import "../../globals.scss";
import Link from "next/link";
import Avatar from "../Posts/Avatar";
import { EAvatar } from "@/variants/avatar";

const Header = () => (
  <div className="header">
    <h2>
      <Link href="/">BrushUp</Link>
    </h2>
    <Avatar variant={EAvatar.header} />
    {/* <div className="headerLogin">
      <Button type="link" href="/login">Войти</Button>
      <Divider type="vertical" />
      <Button type="link" href="/register">Зарегистрироваться</Button>
    </div> */}
  </div>
);

export default Header;