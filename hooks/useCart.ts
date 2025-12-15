'use client';

import { Product } from "@/models/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  isInCart: (productId: number) => boolean;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) =>
        set((state) => ({
          items: [...state.items, product],
        })),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      isInCart: (productId) =>
        get().items.some((item) => item.id === productId),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "deisi-cart-storage", // Chave no localStorage
    }
  )
);