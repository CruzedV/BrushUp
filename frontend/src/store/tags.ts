import { TTag } from "@shared/types/tag";
import { create } from "zustand";

interface ITagsStore {
  tags: TTag[];
  setTags: (tags: TTag[]) => void;
}

export const useTagsStore = create<ITagsStore>((set) => ({
  tags: [],
  setTags:(tags) => set({ tags }),
}));