import { create } from "zustand";

type SheetFinanceAccountState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSheetNewAccount = create<SheetFinanceAccountState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
