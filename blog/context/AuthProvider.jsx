"use client";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/useAuthStore";
import { createContext, useContext } from "react";

// ✅ Create Context
const AuthContext = createContext(null);

// ✅ Custom Hook to Access Context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// ✅ AuthProvider Component
export function AuthProvider({ children }) {
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const { signOutMutation } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isHydrated,
        signOut: () => {
          signOutMutation.mutate();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
