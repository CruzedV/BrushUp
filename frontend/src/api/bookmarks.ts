import { TMarkPost } from "@shared/types/bookmarks";
import api from "helpers/axios";

export const markPost = async (data: TMarkPost) => {
  const response = await api.post(`/api/bookmarks`, data);
  return response;
}

export const unmarkPost = async (id: string) => {
  const response = await api.delete(`/api/bookmarks/${id}`);
  return response;
}
