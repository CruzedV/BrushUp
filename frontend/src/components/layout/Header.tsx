"use client";

import "../../globals.scss";
import Link from "next/link";
import Avatar from "../Posts/Avatar";
import { EAvatar } from "@/variants/avatar";
import { Button, Divider } from "antd";
import { useUserStore } from "store/user";

type TProps = {
  className?: string;
};

const Header = ({ className = "" }: TProps) => {
  const user = useUserStore((state) => state.user);
  return (
    <div className={`header ${className}`}>
      <h2>
        <Link href="/">BrushUp</Link>
      </h2>
      {}
      {user ? (
        <Avatar user={user} variant={EAvatar.header} />
      ) : (
        <div className="headerLogin">
          <Button type="link" href="/auth/login">Войти</Button>
          <Divider type="vertical" />
          <Button type="link" href="/auth/register">Зарегистрироваться</Button>
        </div>
      )}
    </div>
  );
}

export default Header;