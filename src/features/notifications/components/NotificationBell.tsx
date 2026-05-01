'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import type { Notification, NotificationType } from '../types';

type PopupMeta = { color: string; bg: string; stripe: string };

const POPUP_TYPE: Record<NotificationType, PopupMeta> = {
  order: { color: 'text-terracotta', bg: 'bg-terracotta/10', stripe: 'bg-terracotta' },
  offer: { color: 'text-amber', bg: 'bg-amber/10', stripe: 'bg-amber' },
  system: { color: 'text-sage', bg: 'bg-sage/15', stripe: 'bg-sage' },
  delivery: { color: 'text-mocha', bg: 'bg-mocha/10', stripe: 'bg-mocha' },
  wishlist: { color: 'text-rose', bg: 'bg-rose/10', stripe: 'bg-rose' },
};

function TypeIcon({ type }: { type: NotificationType }) {
  switch (type) {
    case 'order':
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case 'offer':
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      );
    case 'system':
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    case 'delivery':
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
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
    case 'wishlist':
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
  }
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yest.';
  return `${days}d`;
}

const POPUP_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'order',
    title: 'Order Confirmed',
    body: 'Your order #ORD-2026-001 "Himalayan Blossom Keyring Set" has been confirmed.',
    timestamp: '2026-04-30T08:15:00Z',
    read: false,
    actionUrl: AppPaths.orders.detail('ORD-2026-001'),
  },
  {
    id: 'n2',
    type: 'delivery',
    title: 'Out for Delivery',
    body: 'Package for #ORD-2026-001 is out for delivery in Kathmandu today.',
    timestamp: '2026-04-30T06:00:00Z',
    read: false,
    actionUrl: AppPaths.orders.detail('ORD-2026-001'),
  },
  {
    id: 'n3',
    type: 'offer',
    title: 'Weekend Flash Sale',
    body: '25% off all Himalayan Crochet Flowers. Code: HIMALAYA25.',
    timestamp: '2026-04-29T14:00:00Z',
    read: false,
    actionUrl: AppPaths.products.list,
  },
  {
    id: 'n4',
    type: 'system',
    title: 'Profile Updated',
    body: 'Delivery address for Thamel, Kathmandu updated successfully.',
    timestamp: '2026-04-29T11:30:00Z',
    read: false,
  },
  {
    id: 'n5',
    type: 'order',
    title: 'Order Shipped',
    body: '#ORD-2026-002 "Woollen Mountain Sweater" dispatched from Pokhara.',
    timestamp: '2026-04-28T09:00:00Z',
    read: false,
    actionUrl: AppPaths.orders.detail('ORD-2026-002'),
  },
  {
    id: 'n6',
    type: 'wishlist',
    title: 'Back in Stock',
    body: '"Lotus Crochet Coaster Set" is back in stock. Limited availability!',
    timestamp: '2026-04-28T07:30:00Z',
    read: true,
    actionUrl: AppPaths.products.detail('lotus-crochet-coaster-set'),
  },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(POPUP_NOTIFICATIONS);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Bell button */}
      <button
        type="button"
        aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`relative rounded-full p-2 transition-colors duration-200 ${
          open ? 'bg-linen text-terracotta' : 'text-warm-gray hover:bg-linen hover:text-terracotta'
        }`}
      >
        <motion.div
          animate={
            unreadCount > 0 && !open ? { rotate: [0, -8, 8, -5, 5, -2, 2, 0] } : { rotate: 0 }
          }
          transition={{ repeat: Infinity, repeatDelay: 6, duration: 0.55, ease: 'easeInOut' }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </motion.div>

        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-terracotta px-0.5 font-ui text-[9px] font-bold text-cream leading-none"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Popup panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.17, ease: 'easeOut' }}
            className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-sand/50 bg-cream/98 shadow-2xl backdrop-blur-xl sm:w-[22rem]"
            role="dialog"
            aria-label="Notifications"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-sand/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-terracotta"
                  aria-hidden="true"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <h2 className="font-ui text-sm font-semibold text-espresso">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-terracotta/12 px-2 py-0.5 font-ui text-[11px] font-semibold text-terracotta">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <button
                type="button"
                aria-label="Close notifications"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-warm-gray transition-colors hover:bg-linen hover:text-espresso"
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Notification list */}
            <div className="max-h-[360px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-warm-gray/40"
                    aria-hidden="true"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <p className="font-ui text-xs text-warm-gray">You're all caught up!</p>
                </div>
              ) : (
                notifications.map((n, i) => {
                  const meta = POPUP_TYPE[n.type];
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, delay: i * 0.04 }}
                      className={`group relative border-b border-sand/30 transition-colors duration-150 last:border-0 ${
                        n.read ? 'bg-transparent' : 'bg-linen/50'
                      } hover:bg-linen/80`}
                    >
                      {/* Left type stripe */}
                      <div className={`absolute top-0 left-0 h-full w-0.5 ${meta.stripe}`} />

                      <div className="flex items-start gap-3 px-4 py-3 pl-5">
                        {/* Type icon bubble */}
                        <div
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${meta.bg} ${meta.color}`}
                        >
                          <TypeIcon type={n.type} />
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p
                              className={`truncate font-ui text-[12px] ${
                                n.read
                                  ? 'font-medium text-espresso/75'
                                  : 'font-semibold text-espresso'
                              }`}
                            >
                              {n.title}
                            </p>
                            <div className="flex shrink-0 items-center gap-1.5">
                              <span className="font-ui text-[10px] text-warm-gray/50">
                                {timeAgo(n.timestamp)}
                              </span>
                              {!n.read && (
                                <span
                                  className="h-1.5 w-1.5 rounded-full bg-terracotta"
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                          </div>
                          <p className="mt-0.5 line-clamp-2 font-ui text-[11px] text-warm-gray leading-snug">
                            {n.body}
                          </p>
                          {n.actionUrl && (
                            <Link
                              href={n.actionUrl}
                              onClick={() => setOpen(false)}
                              className={`mt-1 inline-block font-ui text-[11px] font-medium transition-colors hover:opacity-70 ${meta.color}`}
                            >
                              View →
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-sand/40 bg-linen/30 px-4 py-2.5">
              {unreadCount > 0 ? (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="font-ui text-[12px] text-warm-gray transition-colors hover:text-espresso"
                >
                  Mark all as read
                </button>
              ) : (
                <span className="font-ui text-[12px] text-warm-gray/40">All caught up</span>
              )}
              <Link
                href={AppPaths.dashboard.notifications}
                onClick={() => setOpen(false)}
                className="font-ui text-[12px] font-semibold text-terracotta transition-colors hover:text-mocha"
              >
                View all →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
