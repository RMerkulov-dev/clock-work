import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      isLogin: false,
      onLogin: () => set({ isLogin: true }),
      onLogout: () => set({ isLogin: false }),
    }),
    {
      name: "auth_user", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
