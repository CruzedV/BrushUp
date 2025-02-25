import { TUser } from '@/types/user';
import { create } from 'zustand';

interface UserStore {
  user: TUser | null;
  setUser: (user: TUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));