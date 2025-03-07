"use client";

import "../../globals.scss";
import Link from "next/link";
import Avatar from "../Posts/Avatar";
import { EAvatar } from "@/variants/avatar";
import { Button, Divider } from "antd";
import { useUserStore } from "@/store/user";
import { logout } from "@/helpers/functions/auth/logout";

type TProps = {
  className?: string;
};

const Header = ({ className = "" }: TProps) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  return (
    <div className={`header ${className}`}>
      <h2>
        <Link href="/">BrushUp</Link>
      </h2>
      <div className="headerLogin">
        {user ? (
          <>
            <Avatar user={user} variant={EAvatar.header} />
            <Button type="link" href="/auth/login" onClick={() => logout(setUser)}>
              Выйти
            </Button>
          </>
        ) : (
          <>
            <Button type="link" href="/auth/login">Войти</Button>
            <Divider type="vertical" />
            <Button type="link" href="/auth/register">Зарегистрироваться</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;