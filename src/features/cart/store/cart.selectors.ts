import type { AppState } from '@/store';

export const selectCartItems = (state: AppState) => state.cart.items;
export const selectCartIsOpen = (state: AppState) => state.cart.isOpen;
export const selectCartCount = (state: AppState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartSubtotal = (state: AppState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
