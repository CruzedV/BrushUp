import { TBookmark } from "@/types/bookmark";
import api from "helpers/axios";

export const markPost = async (id: string): Promise<TBookmark> => {
  const response = await api.post(`/api/bookmarks/${id}`);
  return response.data;
}

export const unmarkPost = async (id: string): Promise<number> => {
  const response = await api.delete(`/api/bookmarks/${id}`);
  return response.status;
}
