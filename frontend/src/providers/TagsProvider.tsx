"use client";

import { createContext, useContext, useEffect } from "react";
import { getAllTags } from "@/api/tags";
import { useTagsStore } from "@/store/tags";
import { TTag } from "@shared/types/tag";

const TagsContext = createContext<TTag[] | null>(null);

type TProps = {
  children: React.ReactNode;
}

export function TagsProvider({ children }: TProps) {
  const tagsStore = useTagsStore()
  useEffect(() => {
    const getUser = async () => {
      const response = await getAllTags();
      if (response) tagsStore.setTags(response);
    }
    getUser();
  }, []);

  return (
    <TagsContext.Provider value={tagsStore.tags}>
      {children}
    </TagsContext.Provider>
  );
}

export function useTags() {
  return useContext(TagsContext);
}