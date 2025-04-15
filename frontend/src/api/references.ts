import api from "@/helpers/axios";
import { TReferenceArray, TReferenceTags } from "@shared/types/reference";

export const getAllReferenceTags = async (): Promise<TReferenceTags> => {
  const response = await api.get<TReferenceTags>(`/api/references/tags`);
  return response.data;
}

export const getImagesByTags = async (data: string[]): Promise<TReferenceArray> => {
  const response = await api.post(`/api/references/by-tags`, { tags: data } )
  return response.data
}