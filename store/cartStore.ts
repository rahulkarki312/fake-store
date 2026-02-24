"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  carts: Record<string, CartItem[]>; // userId -> cart items

  addToCart: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  isHydrated: boolean;
  setHydrated: (state: boolean) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  getItems: () => CartItem[];
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      carts: {},
      isHydrated: false,
      setHydrated: (state) => set({ isHydrated: state }),
      addToCart: (product, quantity) => {
        const user = useAuthStore.getState().user;
        if (!user) {
          alert("Please login to use cart.");
          return;
        }

        const userId = String(user.id);
        const currentCart = get().carts[userId] || [];

        const existing = currentCart.find((i) => i.id === product.id);

        const updatedCart = existing
          ? currentCart.map((i) =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            )
          : [...currentCart, { ...product, quantity }];

        set({
          carts: {
            ...get().carts,
            [userId]: updatedCart,
          },
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) return;

        const user = useAuthStore.getState().user;
        if (!user) return;

        const userId = String(user.id);
        const currentCart = get().carts[userId] || [];

        const updatedCart = currentCart.map((i) =>
          i.id === id ? { ...i, quantity } : i,
        );

        set({
          carts: {
            ...get().carts,
            [userId]: updatedCart,
          },
        });
      },

      removeFromCart: (id) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        const userId = String(user.id);
        const currentCart = get().carts[userId] || [];

        const updatedCart = currentCart.filter((i) => i.id !== id);

        set({
          carts: {
            ...get().carts,
            [userId]: updatedCart,
          },
        });
      },

      clearCart: () => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        const userId = String(user.id);

        set({
          carts: {
            ...get().carts,
            [userId]: [],
          },
        });
      },

      getItems: () => {
        const user = useAuthStore.getState().user;
        if (!user) return [];

        return get().carts[String(user.id)] || [];
      },

      getTotal: () =>
        get()
          .getItems()
          .reduce((total, item) => total + item.price * item.quantity, 0),

      getItemCount: () =>
        get()
          .getItems()
          .reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
