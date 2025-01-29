"use client";

import "../../globals.scss";
import Link from "next/link";
// import Avatar from "../Posts/Avatar";
// import { EAvatar } from "@/variants/avatar";
import { Button, Divider } from "antd";

type TProps = {
  className?: string;
};

const Header = ({ className = "" }: TProps) => (
  <div className={`header ${className}`}>
    <h2>
      <Link href="/">BrushUp</Link>
    </h2>
    {/* <Avatar variant={EAvatar.header} /> */}
    <div className="headerLogin">
      <Button type="link" href="/auth/login">Войти</Button>
      <Divider type="vertical" />
      <Button type="link" href="/auth/register">Зарегистрироваться</Button>
    </div>
  </div>
);

export default Header;