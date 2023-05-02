import { User } from '@/api/types/user';
import { getInfo } from '@/api/user';
import { getUserInfo } from '@/utils/common';
import { STORGE_USER_INFO } from '@/utils/const';
import { create } from 'zustand';

interface useUserStore {
  user: User | null;
  setUser: (userData: User | null) => void;
  getUser: () => Promise<User>;
}

const useUserStore = create<useUserStore>((set, get) => ({
  user: null,
  setUser: (userData) => {
    set({ user: userData });
    sessionStorage.setItem(STORGE_USER_INFO, JSON.stringify(userData));
  },
  getUser: () => {
    return new Promise((resolve, reject) => {
      const user = get().user;
      if (user) {
        resolve(user);
      } else {
        getUserInfo().then((data) => {
          resolve(data);
        });
      }
    });
  },
}));

export default useUserStore;
