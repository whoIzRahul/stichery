export type WishlistItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  addedAt: string;
};

export type WishlistState = {
  items: WishlistItem[];
};
