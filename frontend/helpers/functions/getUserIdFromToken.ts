import { TRequestBodyUser } from "@shared/types/tokens";
import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token: string): TRequestBodyUser | null => {
  try {
    return jwtDecode<TRequestBodyUser>(token);
  } catch (error) {
    console.error("Ошибка декодирования JWT:", error);
    return null;
  }
};