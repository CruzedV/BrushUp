import { getUserById } from "@/api/users";
import { getUserFromToken } from "../getUserIdFromToken";
import { TUser } from "@/types/user";
import { CookieValueTypes, deleteCookie } from "cookies-next";


export const checkUser = async (
  token: CookieValueTypes | Promise<CookieValueTypes>
): Promise<TUser | null> => {
  if (token) {
    const user_id = getUserFromToken(token.toString())?.user_id;
    if (user_id) {
      try {
        const user = await getUserById(user_id);
        return user;
      } catch (error) {
        console.error(error);
      } 
    }
  }
  deleteCookie("token");
  return null;
}