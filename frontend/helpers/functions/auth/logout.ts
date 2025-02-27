import { TUser } from "@/types/user";
import { deleteCookie } from "cookies-next"

export const logout = (
  setUser: (user: TUser | null) => void,
) => {
  deleteCookie("token");
  setUser(null);
}