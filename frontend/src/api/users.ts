import { TRegisterData } from "@/types/auth";
import { TUpdateUser, TUser } from "@/types/user";
import { TFollowUser } from "@shared/types/follower";
import api from "helpers/axios";

export const createUser = async (data: TRegisterData): Promise<TUser> => {
  const response = await api.post<TUser>(`/api/users`, data);
  return response.data;
};

export const updateUser = async (data: TUpdateUser): Promise<TUser> => {
  const response = await api.put<TUser>(`/api/users`, data);
  return response.data;
}

export const getUserById = async (id: number): Promise<TUser> => {
  const response = await api.get<TUser>(`/api/users/${id}`);
  return response.data;
}

export const followUser = async (data: TFollowUser) => {
  const response = await api.post(`/api/users/follow`, data);
  return response;
}

export const unfollowUser = async (data: TFollowUser) => {
  const response = await api.delete(
    `/api/users/unfollow?follower_id=${data.follower_id}
    &followed_id=${data.followed_id}`
  )
  return response;
}