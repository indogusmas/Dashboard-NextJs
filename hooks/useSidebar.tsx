import { create } from "zustand";


interface SideBarStore {
  isMinimized: boolean;
  toggle: () => void;
}

export const useSidebar = create<SideBarStore>((set) => ({
  isMinimized: false,
  toggle: () => set((state) => ({isMinimized: !state.isMinimized}))
}))