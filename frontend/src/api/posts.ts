import api from "helpers/axios";
import {
  TCreatePost,
  TDeletePost,
  TResponsePosts,
  TPost,
  TUpdatePost,
} from "@shared/types/post";
import { TGetPostsParams } from "@/types/post";

export const getPostById = async (id: string): Promise<TPost> => {
  const response = await api.get(`/api/posts/${id}`);
  return response.status == 404 ? response : response.data;
};

export const getAllPosts = async (
  params: TGetPostsParams,
): Promise<TResponsePosts> => {
  const response = await api.post<TResponsePosts>(
    `/api/posts/all?page=${params.page}`,
    params.data,
  );
  return response.data;
};

export const getSubscribedPosts = async (
  params: TGetPostsParams,
): Promise<TResponsePosts> => {
  const response = await api.post<TResponsePosts>(
    `/api/posts/subscribed?page=${params.page}`,
    params.data,
  );
  return response.data;
};

export const getUserPosts = async (
  params: TGetPostsParams,
): Promise<TResponsePosts> => {
  const response = await api.post<TResponsePosts>(
    `/api/users/user-posts/${params.user_id}?page=${params.page}`,
    params.data
  );
  return response.data;
}

export const getMarkedPosts = async (
  params: TGetPostsParams,
): Promise<TResponsePosts> => {
  const response = await api.post(
    `/api/bookmarks/marked?page=${params.page}`,
    params.data,
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
