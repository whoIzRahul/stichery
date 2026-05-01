'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { Address, Order, UserProfile } from '../types';
import { AccountStats } from './AccountStats';
import { ProfileHeader } from './ProfileHeader';
import { ProfileSidebar } from './ProfileSidebar';
import { RecentOrders } from './RecentOrders';
import { SavedAddresses } from './SavedAddresses';

const mockUser: UserProfile = {
  id: 'u_001',
  name: 'Anita Sharma',
  email: 'anita.sharma@gmail.com',
  phone: '+977 98-4100-0000',
  memberSince: '2023-03-15',
  loyaltyPoints: 3240,
  totalOrders: 12,
  wishlistCount: 7,
};

const mockOrders: Order[] = [
  {
    id: 'ORD-2089',
    date: '2026-04-22',
    status: 'shipped',
    total: 2850,
    trackingCode: 'NP-TRK-88821',
    items: [
      {
        id: 'i1',
        name: 'Crochet Rose Bouquet',
        qty: 1,
        price: 1800,
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=75',
      },
      {
        id: 'i2',
        name: 'Yarn Key Ring',
        qty: 2,
        price: 525,
        imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2071',
    date: '2026-04-10',
    status: 'delivered',
    total: 4500,
    items: [
      {
        id: 'i3',
        name: 'Woolen Sweater — Terracotta',
        qty: 1,
        price: 4500,
        imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=75',
      },
    ],
  },
  {
    id: 'ORD-2055',
    date: '2026-03-28',
    status: 'delivered',
    total: 1650,
    items: [
      {
        id: 'i4',
        name: 'Daisy Hair Clip Set',
        qty: 3,
        price: 450,
        imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=200&q=75',
      },
      {
        id: 'i5',
        name: 'Crochet Bookmark',
        qty: 1,
        price: 300,
        imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&q=75',
      },
    ],
  },
];

const mockAddresses: Address[] = [
  { id: 'a1', label: 'Home', line1: 'Lazimpat, Ward 2', city: 'Kathmandu', isDefault: true },
  { id: 'a2', label: 'Office', line1: 'Pulchowk, Lalitpur', city: 'Lalitpur', isDefault: false },
];

export function ProfilePage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream dark:bg-cream">
      {/* Breadcrumb strip */}
      <div className="border-b border-sand bg-linen/60 dark:border-sand/20 dark:bg-linen/10">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
          {/* Mobile sidebar trigger */}
          <button
            type="button"
            aria-label="Open account menu"
            onClick={() => setMobileSidebarOpen(true)}
            className="mr-1 flex h-7 w-7 items-center justify-center rounded-md text-warm-gray hover:bg-sand hover:text-espresso lg:hidden"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="14" x2="16" y2="14" />
            </svg>
          </button>
          <span className="font-ui text-xs text-warm-gray">Dashboard</span>
          <span className="font-ui text-xs text-warm-gray/40">›</span>
          <span className="font-ui text-xs text-espresso">Profile</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <div className="sticky top-24">
              <ProfileSidebar />
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1">
            <div className="flex flex-col gap-8">
              <ProfileHeader user={mockUser} />
              <AccountStats user={mockUser} />
              <RecentOrders orders={mockOrders} />
              <SavedAddresses addresses={mockAddresses} />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-espresso/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="fixed top-0 left-0 z-50 flex h-full w-64 flex-col bg-cream p-6 shadow-2xl dark:bg-linen lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-heading text-lg font-medium text-espresso">My Account</h3>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-warm-gray hover:text-espresso"
                >
                  <svg
                    width="18"
                    height="18"
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
              <ProfileSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
