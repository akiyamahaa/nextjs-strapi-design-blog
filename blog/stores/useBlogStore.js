import { create } from "zustand";

export const useBlogStore = create((set) => ({
  currentPost: null,
  setCurrentPost: (post) => set({ currentPost: post }),
}));
