"use client";

import { useAuthStore } from "@/lib/stores/auth-store";

export function useAuth() {
  const { user, tokens, isAuthenticated, setAuth, clearAuth, updateUser } =
    useAuthStore();

  const getAuthHeader = () => {
    if (!tokens?.accessToken) return {};
    return {
      Authorization: `Bearer ${tokens.accessToken}`,
    };
  };

  const isRole = (role: "buyer" | "vendor" | "admin") => {
    return user?.role === role;
  };

  return {
    user,
    tokens,
    isAuthenticated,
    setAuth,
    clearAuth,
    updateUser,
    getAuthHeader,
    isRole,
  };
}
