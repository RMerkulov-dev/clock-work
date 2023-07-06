import { create } from "zustand";
import { ModalStore } from "../../../typing";

export const useRegisterModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
