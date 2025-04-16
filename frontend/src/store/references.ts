import { TReferenceArray } from "@shared/types/reference";
import { create } from "zustand";

interface IReferenceStore {
  images: string[];
  timer: number;
  currentIndex: number;
  setImages: (data: TReferenceArray) => void;
  setTimer: (data: number) => void;
  next: () => void;
  prev: () => void;
};

export const useReferenceStore = create<IReferenceStore>((set, get) => ({
  images: [],
  timer: 0,
  currentIndex: 0,

  setImages: (data) => set({ images: data.images, currentIndex: 0 }),

  setTimer: (data) => set({ timer: data }),

  next: () => {
    const { currentIndex, images } = get();
    if (currentIndex < images.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  prev: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },
}));