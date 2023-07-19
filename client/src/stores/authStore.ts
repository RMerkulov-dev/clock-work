import { create, StateCreator } from "zustand";
import { AuthState } from "../../../typing";
import { persist, PersistOptions } from "zustand/middleware";

type MyPersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>
) => StateCreator<AuthState>;
export const useAuthStore = create<AuthState>(
  (persist as MyPersist)(
    (set) => ({
      userId: null,
      token: null,
      setUserId: (userId, token) => set({ userId, token }),
    }),
    {
      name: "auth-store",
    }
  )
);
