'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import type { Order, OrderStatus } from '../types';

const STATUS_STEPS: OrderStatus[] = ['processing', 'confirmed', 'shipped', 'delivered'];

const statusMeta: Record<
  OrderStatus,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    band: string;
    darkBand: string;
  }
> = {
  processing: {
    label: 'Processing',
    color: 'text-amber',
    bg: 'bg-amber/8 dark:bg-amber/12',
    border: 'border-amber/25',
    band: 'bg-amber',
    darkBand: 'dark:bg-amber',
  },
  confirmed: {
    label: 'Confirmed',
    color: 'text-sage',
    bg: 'bg-sage/8 dark:bg-sage/12',
    border: 'border-sage/25',
    band: 'bg-sage',
    darkBand: 'dark:bg-sage',
  },
  shipped: {
    label: 'Shipped',
    color: 'text-mocha',
    bg: 'bg-mocha/8 dark:bg-mocha/12',
    border: 'border-mocha/25',
    band: 'bg-mocha',
    darkBand: 'dark:bg-mocha',
  },
  delivered: {
    label: 'Delivered',
    color: 'text-terracotta',
    bg: 'bg-terracotta/8 dark:bg-terracotta/12',
    border: 'border-terracotta/25',
    band: 'bg-terracotta',
    darkBand: 'dark:bg-terracotta',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-warm-gray',
    bg: 'bg-warm-gray/8 dark:bg-warm-gray/10',
    border: 'border-warm-gray/20',
    band: 'bg-warm-gray',
    darkBand: 'dark:bg-warm-gray',
  },
};

function OrderJourneyBar({ status }: { status: OrderStatus }) {
  if (status === 'cancelled') return null;
  const currentIdx = STATUS_STEPS.indexOf(status);

  return (
    <div className="flex items-center gap-0">
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

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-5 flex items-center justify-between"
      >
        <h2 className="font-heading text-xl font-medium text-espresso">Recent Orders</h2>
        <Link
          href={AppPaths.orders.list}
          className="font-ui text-xs text-terracotta underline-offset-2 transition-colors hover:text-mocha hover:underline"
        >
          View all →
        </Link>
      </motion.div>

      <div className="flex flex-col gap-4">
        {orders.map((order, i) => {
          const meta = statusMeta[order.status];
          const firstImage = order.items[0]?.imageUrl;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28 + i * 0.08 }}
              whileHover={{ y: -2 }}
            >
              <Link
                href={AppPaths.orders.detail(order.id)}
                className={`group relative flex overflow-hidden rounded-2xl border ${meta.border} ${meta.bg} shadow-sm transition-all duration-250 hover:shadow-lg`}
              >
                {/* Left status band */}
                <div className={`w-1 shrink-0 ${meta.band} ${meta.darkBand}`} aria-hidden="true" />

                {/* Hero image strip (desktop) */}
                {firstImage && (
                  <div className="relative hidden h-auto w-28 shrink-0 overflow-hidden sm:block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Image
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

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-4">
                  {/* Top row */}
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

                  {/* Items summary */}
                  <p className="font-body text-sm text-espresso/80 dark:text-espresso/70">
                    {order.items
                      .map((item) => `${item.name}${item.qty > 1 ? ` ×${item.qty}` : ''}`)
                      .join(', ')}
                  </p>

                  {/* Bottom row: journey + price */}
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
        })}

        {orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-sand py-16 text-center dark:border-sand/30"
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
            <p className="font-heading text-lg text-warm-gray">No orders yet</p>
            <Link
              href={AppPaths.products.list}
              className="font-ui text-sm text-terracotta hover:underline"
            >
              Browse our collection →
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
