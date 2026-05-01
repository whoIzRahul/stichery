export type OrderStatus = 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  trackingCode?: string;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  city: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  memberSince: string;
  loyaltyPoints: number;
  totalOrders: number;
  wishlistCount: number;
}
