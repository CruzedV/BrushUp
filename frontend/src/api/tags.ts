import { TTag } from "@shared/types/tag";
import api from "helpers/axios";

export const getAllTags = async (): Promise<TTag[]> => {
  const response = await api.get<TTag[]>(`/api/tags`);
  return response.data;
};