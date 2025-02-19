import api from "helpers/axios";
import {
  CreatePostDto,
  DeletePostDto,
  RequestPostsDto,
  ResponsePostsDto,
  TPost,
  UpdatePostDto,
} from "@shared/types/post";

export const getPostById = async (id: number): Promise<TPost> => {
  const response = await api.get(`/api/posts/${id}`);
  return response.data;
};

export const getAllPosts = async (
  page: number,
  data: RequestPostsDto,
): Promise<ResponsePostsDto> => {
  const response = await api.post<ResponsePostsDto>(
    `/api/posts/all?page=${page}`,
    data
  );
  return response.data;
};

export const getSubscribedPosts = async (
  page: number,
  data: RequestPostsDto,
): Promise<ResponsePostsDto> => {
  const response = await api.post<ResponsePostsDto>(
    `/api/posts/subscribed?page=${page}`,
    data
  );
  return response.data;
};

export const createPost = async (data: CreatePostDto): Promise<TPost> => {
  const response = await api.post<TPost>(`/api/posts/create`, data);
  return response.data;
}

export const updatePost = async (data: UpdatePostDto): Promise<TPost> => {
  const response = await api.put<TPost>(`/api/posts/update`, data);
  return response.data;
}

export const deletePost = async (data: DeletePostDto) => {
  const response = api.delete(
    `/api/posts?user_id=${data.user_id}&article_id=${data.article_id}`,
  );
  return response;
}
