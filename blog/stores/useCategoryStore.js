import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  currentCategory: null,
  setCurrentCategory: (category) => set({ currentCategory: category }),
}));
