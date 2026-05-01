export type NotificationType = 'order' | 'offer' | 'system' | 'delivery' | 'wishlist';

export type FilterKey = NotificationType | 'all' | 'unread';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
