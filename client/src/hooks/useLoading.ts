import { create } from "zustand";
import { LoadingStore } from "../../../typing";

export const useLoading = create<LoadingStore>((set) => ({
  isLoading: false,
  onLoadingStart: () => set({ isLoading: true }),
  onLoadingFinish: () => set({ isLoading: false }),
}));
