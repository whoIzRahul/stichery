'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ProfileSidebar } from '@/features/profile';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { MOCK_ORDERS } from '../data';
import type { Order, OrderStatus } from '../types';

type SortKey = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';
type FilterKey = OrderStatus | 'all';

const STATUS_STEPS: OrderStatus[] = ['processing', 'confirmed', 'shipped', 'delivered'];

const STATUS_META: Record<
  OrderStatus,
  { label: string; color: string; bg: string; border: string; band: string }
> = {
  processing: {
    label: 'Processing',
    color: 'text-amber',
    bg: 'bg-amber/8 dark:bg-amber/12',
    border: 'border-amber/25',
    band: 'bg-amber',
  },
  confirmed: {
    label: 'Confirmed',
    color: 'text-sage',
    bg: 'bg-sage/8 dark:bg-sage/12',
    border: 'border-sage/25',
    band: 'bg-sage',
  },
  shipped: {
    label: 'Shipped',
    color: 'text-mocha',
    bg: 'bg-mocha/8 dark:bg-mocha/12',
    border: 'border-mocha/25',
    band: 'bg-mocha',
  },
  delivered: {
    label: 'Delivered',
    color: 'text-terracotta',
    bg: 'bg-terracotta/8 dark:bg-terracotta/12',
    border: 'border-terracotta/25',
    band: 'bg-terracotta',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-warm-gray',
    bg: 'bg-warm-gray/8 dark:bg-warm-gray/10',
    border: 'border-warm-gray/20',
    band: 'bg-warm-gray',
  },
};

const PAGE_SIZE = 6;

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'amount-desc', label: 'Amount: High → Low' },
  { value: 'amount-asc', label: 'Amount: Low → High' },
];

const FILTER_OPTIONS: Array<{ key: FilterKey; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'processing', label: 'Processing' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
];

function OrderJourneyBar({ status }: { status: OrderStatus }) {
  if (status === 'cancelled') return null;
  const currentIdx = STATUS_STEPS.indexOf(status);
  return (
    <div className="flex items-center">
      {STATUS_STEPS.map((step, idx) => {
        const done = idx <= currentIdx;
        const isCurrent = idx === currentIdx;
        return (
          <div key={step} className="flex items-center">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border text-[9px] font-bold transition-all duration-300 ${
                done
                  ? 'border-terracotta bg-terracotta text-cream'
                  : 'border-sand bg-cream text-warm-gray/40 dark:border-sand/30 dark:bg-espresso/40'
              } ${isCurrent ? 'ring-2 ring-terracotta/30 ring-offset-1' : ''}`}
            >
              {done ? (
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                idx + 1
              )}
            </div>
            {idx < STATUS_STEPS.length - 1 && (
              <div
                className={`h-px w-6 transition-colors duration-300 ${done && idx < currentIdx ? 'bg-terracotta' : 'bg-sand dark:bg-sand/30'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order, index }: { order: Order; index: number }) {
  const meta = STATUS_META[order.status];
  const firstImage = order.items[0]?.imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
    >
      <Link
        href={AppPaths.orders.detail(order.id)}
        className={`group relative flex overflow-hidden rounded-2xl border ${meta.border} ${meta.bg} shadow-sm transition-all duration-250 hover:shadow-lg`}
      >
        <div className={`w-1.5 shrink-0 ${meta.band}`} aria-hidden="true" />

        {firstImage && (
          <div className="relative hidden h-auto w-28 shrink-0 overflow-hidden sm:block">
            {/* biome-ignore lint/performance/noImgElement: external image */}
            <img
              src={firstImage}
              alt={order.items[0].name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent to-black/10"
              aria-hidden="true"
            />
            {order.items.length > 1 && (
              <div className="absolute bottom-2 right-2 rounded-full bg-espresso/70 px-2 py-0.5 font-ui text-[10px] text-cream backdrop-blur-sm">
                +{order.items.length - 1}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-heading text-lg font-medium leading-tight text-espresso transition-colors group-hover:text-terracotta">
                #{order.id}
              </p>
              <p className="font-body text-xs text-warm-gray">
                {new Date(order.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <span
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-ui text-[11px] font-semibold ${meta.color} ${meta.border} ${order.status === 'processing' ? 'animate-pulse' : ''}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${meta.band}`} />
              {meta.label}
            </span>
          </div>

          <p className="line-clamp-1 font-body text-sm text-espresso/80 dark:text-espresso/70">
            {order.items
              .map((item) => `${item.name}${item.qty > 1 ? ` ×${item.qty}` : ''}`)
              .join(', ')}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <OrderJourneyBar status={order.status} />

            <div className="flex items-center gap-3">
              <span className="font-heading text-lg font-medium text-espresso">
                रू {order.total.toLocaleString()}
              </span>
              {order.status === 'shipped' && order.trackingCode && (
                <span className="rounded-lg border border-mocha/30 bg-mocha/10 px-2.5 py-1 font-ui text-[10px] font-semibold text-mocha">
                  Track ↗
                </span>
              )}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-warm-gray/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-terracotta"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<FilterKey>('all');
  const [sortKey, setSortKey] = useState<SortKey>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: MOCK_ORDERS.length };
    for (const o of MOCK_ORDERS) {
      c[o.status] = (c[o.status] ?? 0) + 1;
    }
    return c;
  }, []);

  const filtered = useMemo(() => {
    const list =
      statusFilter === 'all'
        ? [...MOCK_ORDERS]
        : MOCK_ORDERS.filter((o) => o.status === statusFilter);

    switch (sortKey) {
      case 'date-asc':
        list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'amount-asc':
        list.sort((a, b) => a.total - b.total);
        break;
      case 'amount-desc':
        list.sort((a, b) => b.total - a.total);
        break;
    }
    return list;
  }, [statusFilter, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function changeFilter(f: FilterKey) {
    setStatusFilter(f);
    setCurrentPage(1);
  }

  const totalSpent = MOCK_ORDERS.reduce(
    (sum, o) => (o.status !== 'cancelled' ? sum + o.total : sum),
    0,
  );
  const deliveredCount = counts.delivered ?? 0;
  const inProgressCount =
    (counts.processing ?? 0) + (counts.confirmed ?? 0) + (counts.shipped ?? 0);

  const summaryStats = [
    { label: 'Total Orders', value: MOCK_ORDERS.length, accent: 'text-espresso' },
    { label: 'Delivered', value: deliveredCount, accent: 'text-terracotta' },
    { label: 'In Progress', value: inProgressCount, accent: 'text-mocha' },
    {
      label: 'Total Spent',
      value: `रू ${totalSpent.toLocaleString()}`,
      accent: 'text-sage',
    },
  ];

  return (
    <div className="min-h-screen bg-cream dark:bg-cream">
      {/* Breadcrumb strip */}
      <div className="border-b border-sand bg-linen/60 dark:border-sand/20 dark:bg-linen/10">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
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
          <span className="font-ui text-xs text-espresso">My Orders</span>
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
            {/* Page header */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <h1 className="font-heading text-2xl font-medium text-espresso">My Orders</h1>
              <p className="mt-1 font-body text-sm text-warm-gray">
                Track and manage all your Stitchery purchases
              </p>
            </motion.div>

            {/* Summary stats */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {summaryStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.06 }}
                  className="rounded-xl border border-sand bg-cream p-4 shadow-sm dark:border-sand/20 dark:bg-linen/55"
                >
                  <p className={`font-heading text-2xl font-medium leading-none ${stat.accent}`}>
                    {stat.value}
                  </p>
                  <p className="mt-1.5 font-ui text-xs text-warm-gray">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Filter + Sort controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-5"
            >
              {/* Status filter pills */}
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
                {FILTER_OPTIONS.map(({ key, label }) => {
                  const count = counts[key] ?? 0;
                  const isActive = statusFilter === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => changeFilter(key)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-ui text-xs transition-all duration-200 ${
                        isActive
                          ? 'border-terracotta bg-terracotta/10 text-terracotta shadow-sm'
                          : 'border-sand bg-cream text-warm-gray hover:border-terracotta/40 hover:text-espresso dark:border-sand/30 dark:bg-linen/20'
                      }`}
                    >
                      {label}
                      {count > 0 && (
                        <span
                          className={`rounded-full px-1.5 py-0.5 font-ui text-[10px] font-semibold ${
                            isActive
                              ? 'bg-terracotta/15 text-terracotta'
                              : 'bg-sand/60 text-warm-gray dark:bg-sand/20'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sort + result count */}
              <div className="mt-3 flex items-center justify-between">
                <p className="font-body text-sm text-warm-gray">
                  {filtered.length} {filtered.length === 1 ? 'order' : 'orders'}
                </p>
                <div className="relative">
                  <select
                    value={sortKey}
                    onChange={(e) => {
                      setSortKey(e.target.value as SortKey);
                      setCurrentPage(1);
                    }}
                    className="appearance-none rounded-lg border border-sand bg-cream py-1.5 pl-3 pr-8 font-ui text-xs text-espresso transition-colors duration-200 hover:border-terracotta/40 focus:border-terracotta focus:outline-none dark:border-sand/30 dark:bg-linen/20"
                    aria-label="Sort orders"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-warm-gray"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Order list */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${statusFilter}-${sortKey}-${safePage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col gap-4"
              >
                {paginated.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-sand py-20 text-center dark:border-sand/30"
                  >
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-sand"
                      aria-hidden="true"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <p className="font-heading text-lg text-warm-gray">No orders found</p>
                    <button
                      type="button"
                      onClick={() => changeFilter('all')}
                      className="font-ui text-sm text-terracotta hover:underline"
                    >
                      Clear filter
                    </button>
                  </motion.div>
                ) : (
                  paginated.map((order, i) => <OrderCard key={order.id} order={order} index={i} />)
                )}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-8 flex items-center justify-center gap-1.5"
              >
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-sand text-warm-gray transition-all duration-200 hover:border-terracotta hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-40 dark:border-sand/30"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === safePage ? 'page' : undefined}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border font-ui text-xs transition-all duration-200 ${
                      page === safePage
                        ? 'border-terracotta bg-terracotta text-cream shadow-sm'
                        : 'border-sand bg-cream text-warm-gray hover:border-terracotta/50 hover:text-espresso dark:border-sand/30 dark:bg-linen/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-sand text-warm-gray transition-all duration-200 hover:border-terracotta hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-40 dark:border-sand/30"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </motion.div>
            )}
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
