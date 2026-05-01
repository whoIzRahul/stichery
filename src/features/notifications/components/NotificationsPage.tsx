'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ProfileSidebar } from '@/features/profile';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import type { FilterKey, Notification, NotificationType } from '../types';

type TypeMeta = {
  label: string;
  color: string;
  bg: string;
  border: string;
  band: string;
  icon: React.ReactNode;
};

function OrderIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function OfferIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function WishlistIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

const TYPE_META: Record<NotificationType, TypeMeta> = {
  order: {
    label: 'Order',
    color: 'text-terracotta',
    bg: 'bg-terracotta/10',
    border: 'border-terracotta/20',
    band: 'bg-terracotta',
    icon: <OrderIcon />,
  },
  offer: {
    label: 'Offer',
    color: 'text-amber',
    bg: 'bg-amber/10',
    border: 'border-amber/20',
    band: 'bg-amber',
    icon: <OfferIcon />,
  },
  system: {
    label: 'System',
    color: 'text-sage',
    bg: 'bg-sage/15',
    border: 'border-sage/25',
    band: 'bg-sage',
    icon: <SystemIcon />,
  },
  delivery: {
    label: 'Delivery',
    color: 'text-mocha',
    bg: 'bg-mocha/10',
    border: 'border-mocha/20',
    band: 'bg-mocha',
    icon: <DeliveryIcon />,
  },
  wishlist: {
    label: 'Wishlist',
    color: 'text-rose',
    bg: 'bg-rose/10',
    border: 'border-rose/20',
    band: 'bg-rose',
    icon: <WishlistIcon />,
  },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-NP', { day: 'numeric', month: 'short' });
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'order',
    title: 'Order Confirmed',
    body: 'Your order #ORD-2026-001 for "Himalayan Blossom Keyring Set" has been confirmed and is being carefully handcrafted by our artisans.',
    timestamp: '2026-04-30T08:15:00Z',
    read: false,
    actionUrl: AppPaths.orders.detail('ORD-2026-001'),
  },
  {
    id: 'n2',
    type: 'delivery',
    title: 'Out for Delivery',
    body: 'Your package for order #ORD-2026-001 is out for delivery in Kathmandu. Expected arrival by 5 PM today.',
    timestamp: '2026-04-30T06:00:00Z',
    read: false,
    actionUrl: AppPaths.orders.detail('ORD-2026-001'),
  },
  {
    id: 'n3',
    type: 'offer',
    title: 'Weekend Flash Sale',
    body: 'Enjoy 25% off on all Himalayan Crochet Flowers this weekend only. Use code HIMALAYA25 at checkout.',
    timestamp: '2026-04-29T14:00:00Z',
    read: false,
    actionUrl: AppPaths.products.list,
  },
  {
    id: 'n4',
    type: 'system',
    title: 'Profile Updated',
    body: 'Your delivery address for Thamel, Kathmandu has been successfully updated on your account.',
    timestamp: '2026-04-29T11:30:00Z',
    read: false,
    actionUrl: AppPaths.dashboard.profile,
  },
  {
    id: 'n5',
    type: 'order',
    title: 'Order Shipped',
    body: 'Your order #ORD-2026-002 "Woollen Mountain Sweater (Large, Rust)" has been dispatched from Pokhara.',
    timestamp: '2026-04-28T09:00:00Z',
    read: false,
    actionUrl: AppPaths.orders.detail('ORD-2026-002'),
  },
  {
    id: 'n6',
    type: 'wishlist',
    title: 'Back in Stock',
    body: 'Great news! "Lotus Crochet Coaster Set" from your wishlist is back in stock. Grab it before it sells out!',
    timestamp: '2026-04-28T07:30:00Z',
    read: true,
    actionUrl: AppPaths.products.detail('lotus-crochet-coaster-set'),
  },
  {
    id: 'n7',
    type: 'order',
    title: 'Order Delivered',
    body: 'Your order #ORD-2026-003 "Floral Wall Hanging" has been delivered to your address in Lalitpur. We hope you love it!',
    timestamp: '2026-04-27T15:00:00Z',
    read: true,
    actionUrl: AppPaths.orders.detail('ORD-2026-003'),
  },
  {
    id: 'n8',
    type: 'offer',
    title: 'Spring Collection Launched',
    body: 'Discover our new Spring Himalayan Collection — hand-stitched floral keyrings, mandala coasters, and delicate wall art.',
    timestamp: '2026-04-26T10:00:00Z',
    read: true,
    actionUrl: `${AppPaths.products.list}?sort=new`,
  },
  {
    id: 'n9',
    type: 'system',
    title: 'Security Alert',
    body: 'A new login was detected on your account from Bhaktapur, Nepal. If this was not you, please secure your account immediately.',
    timestamp: '2026-04-25T09:15:00Z',
    read: true,
  },
  {
    id: 'n10',
    type: 'delivery',
    title: 'Delivery Date Updated',
    body: 'Your order #ORD-2026-002 estimated delivery has been updated to May 1, 2026 due to high demand in your area.',
    timestamp: '2026-04-24T16:00:00Z',
    read: true,
    actionUrl: AppPaths.orders.detail('ORD-2026-002'),
  },
  {
    id: 'n11',
    type: 'order',
    title: 'Order Processing',
    body: 'Your order #ORD-2026-004 "Mandala Table Runner (Natural Beige)" is currently being crafted by our skilled artisans.',
    timestamp: '2026-04-23T12:00:00Z',
    read: true,
    actionUrl: AppPaths.orders.detail('ORD-2026-004'),
  },
  {
    id: 'n12',
    type: 'wishlist',
    title: 'Price Drop Alert',
    body: '"Yak Wool Flower Basket" in your wishlist has dropped in price from रू 650 to रू 480. Limited stock available!',
    timestamp: '2026-04-22T08:45:00Z',
    read: true,
    actionUrl: AppPaths.products.detail('yak-wool-flower-basket'),
  },
  {
    id: 'n13',
    type: 'offer',
    title: 'Loyalty Points Earned',
    body: "Congratulations! You've earned 120 loyalty points from your recent purchase. Redeem them on your next Stitchery order.",
    timestamp: '2026-04-21T14:30:00Z',
    read: true,
    actionUrl: AppPaths.dashboard.profile,
  },
  {
    id: 'n14',
    type: 'system',
    title: 'Password Changed',
    body: 'Your account password was successfully updated. If you did not make this change, please contact us immediately.',
    timestamp: '2026-04-20T11:00:00Z',
    read: true,
  },
  {
    id: 'n15',
    type: 'order',
    title: 'Payment Confirmed',
    body: 'Payment of रू 1,250 via eSewa has been received for order #ORD-2026-004. Thank you for shopping with Stitchery!',
    timestamp: '2026-04-19T10:00:00Z',
    read: true,
    actionUrl: AppPaths.orders.detail('ORD-2026-004'),
  },
];

type FilterTab = { key: FilterKey; label: string };

const FILTER_TABS: FilterTab[] = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'order', label: 'Orders' },
  { key: 'offer', label: 'Offers' },
  { key: 'system', label: 'System' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'wishlist', label: 'Wishlist' },
];

const PAGE_SIZE = 8;

interface NotificationCardProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

function NotificationCard({ notification, onMarkRead }: NotificationCardProps) {
  const meta = TYPE_META[notification.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.22 }}
      className={`relative overflow-hidden rounded-xl border transition-all duration-200 ${
        notification.read
          ? 'border-sand/60 bg-white/50 dark:bg-sand/5'
          : 'border-terracotta/15 bg-linen/70 shadow-sm dark:bg-sand/10'
      }`}
    >
      <div className={`absolute top-0 left-0 h-full w-1 ${meta.band}`} />

      <div className="flex items-start gap-3 p-4 pl-5">
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta.bg} ${meta.color}`}
        >
          {meta.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              {!notification.read && (
                <span className="h-2 w-2 shrink-0 rounded-full bg-terracotta" aria-hidden="true" />
              )}
              <p
                className={`truncate font-ui text-sm ${
                  notification.read ? 'font-medium text-espresso/80' : 'font-semibold text-espresso'
                }`}
              >
                {notification.title}
              </p>
              <span
                className={`hidden shrink-0 rounded-full px-2 py-0.5 font-ui text-[10px] uppercase tracking-wide sm:inline-block ${meta.bg} ${meta.color}`}
              >
                {meta.label}
              </span>
            </div>
            <span className="shrink-0 font-ui text-[11px] text-warm-gray/60">
              {timeAgo(notification.timestamp)}
            </span>
          </div>

          <p className="mt-1 line-clamp-2 font-ui text-[13px] text-warm-gray leading-relaxed">
            {notification.body}
          </p>

          <div className="mt-2 flex items-center gap-4">
            {notification.actionUrl && (
              <Link
                href={notification.actionUrl}
                className={`font-ui text-[12px] font-medium transition-colors duration-200 hover:opacity-70 ${meta.color}`}
              >
                View details →
              </Link>
            )}
            {!notification.read && (
              <button
                type="button"
                onClick={() => onMarkRead(notification.id)}
                className="font-ui text-[12px] text-warm-gray transition-colors duration-200 hover:text-espresso"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [page, setPage] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const counts = useMemo(
    () => ({
      all: notifications.length,
      unread: notifications.filter((n) => !n.read).length,
      order: notifications.filter((n) => n.type === 'order').length,
      offer: notifications.filter((n) => n.type === 'offer').length,
      system: notifications.filter((n) => n.type === 'system').length,
      delivery: notifications.filter((n) => n.type === 'delivery').length,
      wishlist: notifications.filter((n) => n.type === 'wishlist').length,
    }),
    [notifications],
  );

  const thisWeekCount = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return notifications.filter((n) => new Date(n.timestamp).getTime() > weekAgo).length;
  }, [notifications]);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return notifications;
    if (activeFilter === 'unread') return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.type === activeFilter);
  }, [notifications, activeFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function handleFilterChange(key: FilterKey) {
    setActiveFilter(key);
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-espresso/35 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 transform bg-cream shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Account navigation"
      >
        <div className="flex items-center justify-between border-b border-sand px-6 py-5">
          <p className="font-ui text-sm font-semibold text-espresso">My Account</p>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1 text-warm-gray transition-colors hover:text-espresso"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-6">
          <ProfileSidebar />
        </div>
      </aside>

      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          aria-label="Open account menu"
          onClick={() => setMobileSidebarOpen(true)}
          className="flex h-8 w-8 items-center justify-center text-warm-gray transition-colors hover:text-espresso md:hidden"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="3" y1="14" x2="16" y2="14" />
          </svg>
        </button>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 font-ui text-[11px] text-warm-gray uppercase tracking-[0.14em]"
        >
          <Link
            href={AppPaths.dashboard.profile}
            className="transition-colors hover:text-terracotta"
          >
            Dashboard
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-espresso">Notifications</span>
        </nav>
      </div>

      {/* Main grid */}
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <ProfileSidebar />
        </aside>

        {/* Content */}
        <main className="min-w-0">
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl font-semibold text-espresso">Notifications</h1>
              {counts.unread > 0 && (
                <span className="flex h-6 items-center rounded-full bg-terracotta px-2.5 font-ui text-[11px] font-bold text-cream">
                  {counts.unread} new
                </span>
              )}
            </div>
            {counts.unread > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="rounded-sm border border-terracotta/30 px-4 py-2 font-ui text-[12px] text-terracotta uppercase tracking-[0.1em] transition-colors hover:bg-terracotta hover:text-cream"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Total', value: counts.all },
              { label: 'Unread', value: counts.unread, highlight: counts.unread > 0 },
              { label: 'This Week', value: thisWeekCount },
              { label: 'Orders', value: counts.order },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl border p-4 ${
                  stat.highlight
                    ? 'border-terracotta/20 bg-terracotta/10'
                    : 'border-sand/60 bg-white/50 dark:bg-sand/5'
                }`}
              >
                <p
                  className={`font-display text-2xl font-semibold ${stat.highlight ? 'text-terracotta' : 'text-espresso'}`}
                >
                  {stat.value}
                </p>
                <p className="mt-0.5 font-ui text-[11px] text-warm-gray uppercase tracking-[0.12em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="mb-5 flex flex-wrap gap-2">
            {FILTER_TABS.map((tab) => {
              const count = counts[tab.key as keyof typeof counts];
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleFilterChange(tab.key)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-ui text-[12px] transition-all duration-200 ${
                    isActive
                      ? 'bg-terracotta text-cream shadow-sm'
                      : 'border border-sand bg-white/60 text-warm-gray hover:border-terracotta/30 hover:text-espresso dark:bg-sand/5'
                  }`}
                >
                  {tab.label}
                  {count !== undefined && count > 0 && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 font-bold text-[10px] leading-none ${
                        isActive ? 'bg-white/25 text-cream' : 'bg-sand text-espresso'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Notification list */}
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {paginated.length > 0 ? (
                paginated.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkRead={markRead}
                  />
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 py-24 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linen">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-warm-gray/50"
                      aria-hidden="true"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-ui text-sm font-medium text-espresso">All quiet here</p>
                    <p className="mt-1 font-ui text-xs text-warm-gray">
                      No notifications in this category
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="font-ui text-[12px] text-warm-gray">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}{' '}
                of {filtered.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-sand text-warm-gray transition-colors hover:border-terracotta/40 hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    aria-label={`Page ${p}`}
                    aria-current={page === p ? 'page' : undefined}
                    className={`flex h-8 w-8 items-center justify-center rounded-full font-ui text-[12px] transition-all duration-200 ${
                      page === p
                        ? 'bg-terracotta font-medium text-cream'
                        : 'border border-sand text-warm-gray hover:border-terracotta/40 hover:text-terracotta'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-sand text-warm-gray transition-colors hover:border-terracotta/40 hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
