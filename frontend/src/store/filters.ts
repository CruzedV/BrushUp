import { TPostFilters } from "@shared/types/post";
import { create } from "zustand";

interface IFiltersStore {
  filters: TPostFilters;
  setFilters: (filters: TPostFilters) => void;
  clearFilters: () => void;
}

export const useFiltersStore = create<IFiltersStore>((set) => ({
  filters: {
    tags: [],
    query: "",
  },
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: { tags: [], query: "" }})
}))