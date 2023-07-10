import { create } from "zustand";
import { AuthProps } from "../../../typing";

export const useAuth = create<AuthProps>((set) => ({
  isLogin: false,
  onLogin: () => set({ isLogin: true }),
  onLogout: () => set({ isLogin: false }),
}));
