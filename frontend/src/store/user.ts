import { TUser } from '@/types/user';
import { create } from 'zustand';

interface IUserStore {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));