  import api from "helpers/axios";
import {
  TCreatePost,
  TDeletePost,
  TRequestPosts,
  TResponsePosts,
  TPost,
  TUpdatePost,
} from "@shared/types/post";

export const getPostById = async (id: string): Promise<TPost> => {
  const response = await api.get(`/api/posts/${id}`);
  return response.status == 404 ? response : response.data;
};

export const getAllPosts = async (
  page: number,
  data: TRequestPosts,
): Promise<TResponsePosts> => {
  const response = await api.post<TResponsePosts>(
    `/api/posts/all?page=${page}`,
    data
  );
  return response.data;
};

export const getSubscribedPosts = async (
  page: number,
  data: TRequestPosts,
): Promise<TResponsePosts> => {
  const response = await api.post<TResponsePosts>(
    `/api/posts/subscribed?page=${page}`,
    data
  );
  return response.data;
};

export const getUserPosts = async (
  page: number,
  data: TRequestPosts,
): Promise<TResponsePosts> => {
  const response = await api.post<TResponsePosts>(
    `/api/users/user-posts?page=${page}`,
    data
  );
  return response.data;
}

export const createPost = async (data: TCreatePost): Promise<TPost> => {
  const response = await api.post<TPost>(`/api/posts/create`, data);
  return response.data;
}

export const updatePost = async (data: TUpdatePost): Promise<TPost> => {
  const response = await api.put<TPost>(`/api/posts/update`, data);
  return response.data;
}

export const deletePost = async (data: TDeletePost) => {
  const response = api.delete(`/api/posts/${data.article_id}`);
  return response;
}
