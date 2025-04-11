import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      signOut: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage", // Tên key lưu trong AsyncStorage
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state.isHydrated = true; // ✅ Khi Zustand hydrate xong
      },
    }
  )
);
