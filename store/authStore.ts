"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      login: async (token) => {
        const decoded = jwtDecode<DecodedToken>(token);
        const userId = decoded.sub;

        const res = await fetch(
          `https://fakestoreapi.com/users/${userId}`
        );
        const userData = await res.json();

        set({
          token,
          user: {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            firstName: userData.name.firstname,
            lastName: userData.name.lastname,
          },
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);