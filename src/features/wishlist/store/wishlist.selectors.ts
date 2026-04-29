import type { AppState } from '@/store';

export const selectWishlistItems = (state: AppState) => state.wishlist.items;
export const selectWishlistCount = (state: AppState) => state.wishlist.items.length;
export const selectIsInWishlist = (id: string) => (state: AppState) =>
  state.wishlist.items.some((i) => i.id === id);
