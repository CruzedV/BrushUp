import { TReturnToken } from "@/types/tokens";
import { getUserFromToken } from "./getUserIdFromToken";
import { requestWithReturn } from "./requestWithReturn";
import { getUserById } from "@/api/users";
import { redirect } from "next/navigation";
import { TUser } from "@/types/user";

export const authUser = async (
  response: TReturnToken | string,
  errorMessage: (text: string) => void,
  successMessage: (text: string) => void,
  setUser: (user: TUser) => void,
  setIsLoading?: (value: React.SetStateAction<boolean>) => void,
) => {
  const token = typeof response == "string" ? response : response.token;
  if (response) {
    const user_id = getUserFromToken(token)?.user_id;
    if (user_id) {
      const user = await requestWithReturn<number, TUser>(
        getUserById,
        user_id,
        () => errorMessage("Ошибка при загрузке"),
        undefined,
        setIsLoading,
      );
      if (user) {
        setUser(user);
        localStorage.setItem("token", token);
        successMessage('Вход выполнен успешно!');
        redirect('/');
      } else {
        errorMessage('Ошибка при получении пользователя');
      }
    } else {
      errorMessage('Ошибка при определении пользователя');
    }
  } else {
    errorMessage('Ошибка при запросе входа');
  }
}
