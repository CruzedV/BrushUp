import { TMarkPost } from "@shared/types/bookmarks";
import { TMarkedPost, TResponsePosts } from "@shared/types/post";
import api from "helpers/axios";

export const getMarkedPosts = async (
  data: TMarkedPost
): Promise<TResponsePosts> => {
  const response = await api.post(`/api/bookmarks/marked`, data);
  return response.data;
}

export const markPost = async (data: TMarkPost) => {
  const response = await api.post(`/api/bookmarks`, data);
  return response;
}

export const unmarkPost = async (id: number) => {
  const response = await api.delete(`/api/bookmarks/${id}`);
  return response;
}
