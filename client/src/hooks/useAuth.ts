import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthProps, MyPersist } from "../../../typing";

export const useAuth = create<AuthProps>(
  (persist as MyPersist)(
    (set: any) => ({
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
