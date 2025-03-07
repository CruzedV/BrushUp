import { TLoginData, TRegisterData } from "@/types/auth";
import { TReturnToken } from "@/types/tokens";
import api from "@/helpers/axios";

export const loginUser = async (
  data: TLoginData
): Promise<TReturnToken> => {
  const response = await api.post(`/api/auth/login`, data);
  return response.data;
}

export const registerUser = async (
  data: TRegisterData
): Promise<TReturnToken> => {
  const response = await api.post(`/api/auth/register`, data);
  return response.data;
}
