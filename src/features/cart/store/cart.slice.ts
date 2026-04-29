import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../types';

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(
        (i) => i.id === action.payload.id && i.color === action.payload.color,
      );
      if (existing) {
        existing.quantity = Math.min(existing.quantity + action.payload.quantity, 10);
      } else {
        state.items.push(action.payload);
      }
      state.isOpen = true;
    },
    removeItem(state, action: PayloadAction<{ id: string; color?: string }>) {
      state.items = state.items.filter(
        (i) => !(i.id === action.payload.id && i.color === action.payload.color),
      );
    },
    updateQuantity(state, action: PayloadAction<{ id: string; color?: string; quantity: number }>) {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.color === action.payload.color,
      );
      if (item) {
        item.quantity = Math.max(1, Math.min(action.payload.quantity, 10));
      }
    },
    clearCart(state) {
      state.items = [];
    },
    openSidebar(state) {
      state.isOpen = true;
    },
    closeSidebar(state) {
      state.isOpen = false;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, openSidebar, closeSidebar } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
