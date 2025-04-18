import { TRegisterData } from "@/types/auth";
import { TUpdateUser, TUser } from "@/types/user";
import api from "@/helpers/axios";

export const createUser = async (data: TRegisterData): Promise<TUser> => {
  const response = await api.post<TUser>(`/api/users`, data);
  return response.data;
};

export const deleteUser = async () => {
  const response = await api.delete(`/api/users/self-delete`);
  return response;
}

export const updateUser = async (data: TUpdateUser): Promise<TUser> => {
  const newData = {
    ...data,
    profile_picture: data.profile_picture.fileList[0].originFileObj?.base64,
  }
  const response = await api.put<TUser>(`/api/users`, newData);
  return response.data;
}

export const getUserById = async (id: string): Promise<TUser> => {
  const response = await api.get<TUser>(`/api/users/${id}`);
  return response.data;
}

export const followUser = async (followed_id: string): Promise<number> => {
  const response = await api.post(`/api/users/follow/${followed_id}`);
  return response.status;
}

export const unfollowUser = async (followed_id: string): Promise<number> => {
  const response = await api.delete(
    `/api/users/unfollow/${followed_id}`
  )
  return response.status;
}

export const checkIsFollowing = async (user_id: string): Promise<boolean> => {
  const response = await api.post(`/api/users/is-following/${user_id}`)
  return response.data;
}

export const checkIsBookmarked = async (post_id: string): Promise<boolean> => {
  const response = await api.post(`/api/users/is-bookmarked/${post_id}`)
  return response.data;
}