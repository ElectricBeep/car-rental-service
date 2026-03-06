import { create } from "zustand";

import { Manufacturer } from "@/types/api/models/Manufacturer";

export type ModalType =
  | "createManufacturer";

interface ModalData {
  manufacturers?: Manufacturer[];
  id?: string;
  userId?: number;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
