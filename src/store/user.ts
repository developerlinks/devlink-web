import { User } from '@/api/types/user';
import { getUserInfo } from '@/utils/common';
import { create } from 'zustand';

interface UseUserStore {
  user: User | null;
  setUser: (userData: User | null) => void;
  getUser: () => Promise<User>;
  clearUser: () => void;
}

const useUserStore = create<UseUserStore>((set, get) => ({
  user: null,
  setUser: (userData) => {
    set({ user: userData });
  },
  getUser: () => {
    return new Promise((resolve, reject) => {
      const user = get().user;
      if (user) {
        resolve(user);
      } else {
        getUserInfo().then((data) => {
          get().setUser(data);
          resolve(data);
        });
      }
    });
  },
  clearUser: () => {
    set({ user: null });
  },
}));

export default useUserStore;
