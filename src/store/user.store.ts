import { UserInterface } from "@/types/types/types.user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserState {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
  updateUser: (updates: Partial<UserInterface>) => void;
  getUser: () => UserInterface | null;
  clearUser: () => void;
}

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserInterface) => set({ user }),
      updateUser: (updates: UserInterface) =>
        set((state: UserState) => ({
          user: { ...state.user, ...updates },
        })),
      getUser: () => set((state: UserState) => state.user),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: {
        getItem: (key) => {
          const storedValue = localStorage.getItem(key);
          return storedValue ? JSON.parse(storedValue) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);

export default useUserStore;
