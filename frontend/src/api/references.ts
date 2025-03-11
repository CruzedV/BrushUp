import api from "@/helpers/axios";
import { TReferenceTags } from "@shared/types/reference";

export const getAllReferenceTags = async (): Promise<TReferenceTags> => {
  const response = await api.get<TReferenceTags>(`/api/references/tags`);
  return response.data;
}