"use client";

import { createContext, useContext, useEffect } from "react";
import { useUserStore } from "@/store/user";
import { TUser } from "@/types/user";
import { checkUser } from "@/helpers/functions/auth/checkUser";
import { getCookie } from "cookies-next";

const UserContext = createContext<TUser | null>(null);

type TProps = {
  children: React.ReactNode;
}

export function UserProvider({ children }: TProps) {
  const token = getCookie("token");
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      const user = await checkUser(token);
      if (user) setUser(user);
    }
    getUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}