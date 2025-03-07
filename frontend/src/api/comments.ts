import { TComment } from "@/types/comment";
import { TPostComment, TUpdateComment } from "@shared/types/comment";
import api from "@/helpers/axios";

export const postComment = async (data: TPostComment): Promise<TComment> => {
  const response = await api.post<TComment>(`/api/comments`, data);
  return response.data;
}

export const updateComment = async (data: TUpdateComment): Promise<TComment> => {
  const response = await api.patch<TComment>(`/api/comments`, data);
  return response.data;
}

export const deleteComment = async (id: string) => {
  const response = await api.delete(`/api/comments/${id}`);
  return response;
}