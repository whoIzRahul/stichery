export type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  color?: string;
  colorHex?: string;
  image: string;
};

export type CartState = {
  items: CartItem[];
  isOpen: boolean;
};
