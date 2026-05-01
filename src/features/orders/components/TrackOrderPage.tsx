'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { MOCK_ORDERS } from '../data';
import type { Order, OrderItem, OrderStatus } from '../types';

// ── Step config ───────────────────────────────────────────────────────────────

const ACTIVE_STEPS = ['processing', 'confirmed', 'shipped', 'delivered'] as const;
type ActiveStep = (typeof ACTIVE_STEPS)[number];

interface StepConfig {
  label: string;
  description: string;
  etaLabel: string;
  colorClass: string;
  bgClass: string;
  ringClass: string;
  lineClass: string;
  daysOffset: number;
}

const STEP_CONFIG: Record<ActiveStep, StepConfig> = {
  processing: {
    label: 'Order Placed',
    description:
      'Your order has been received and our artisans in Kathmandu are carefully reviewing it.',
    etaLabel: '1–2 business days to confirm',
    colorClass: 'text-amber',
    bgClass: 'bg-amber',
    ringClass: 'ring-amber/40',
    lineClass: 'bg-amber',
    daysOffset: 0,
  },
  confirmed: {
    label: 'Order Confirmed',
    description:
      'Our team has verified your order and is hand-picking materials for your unique pieces.',
    etaLabel: '2–3 days to ship from Kathmandu',
    colorClass: 'text-sage',
    bgClass: 'bg-sage',
    ringClass: 'ring-sage/40',
    lineClass: 'bg-sage',
    daysOffset: 2,
  },
  shipped: {
    label: 'On Its Way',
    description: 'Your package has left our Kathmandu workshop and is journeying to your door.',
    etaLabel: '3–7 days to reach you',
    colorClass: 'text-mocha',
    bgClass: 'bg-mocha',
    ringClass: 'ring-mocha/40',
    lineClass: 'bg-mocha',
    daysOffset: 5,
  },
  delivered: {
    label: 'Delivered',
    description:
      'Your handcrafted treasures from the Himalayas have arrived safely. Enjoy every stitch!',
    etaLabel: 'Order complete',
    colorClass: 'text-terracotta',
    bgClass: 'bg-terracotta',
    ringClass: 'ring-terracotta/40',
    lineClass: 'bg-terracotta',
    daysOffset: 10,
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(dateStr: string, offsetDays = 0): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getEta(order: Order): string | null {
  if (order.status === 'delivered' || order.status === 'cancelled') return null;
  const windowMap: Record<string, number> = { processing: 14, confirmed: 11, shipped: 7 };
  const days = windowMap[order.status] ?? 10;
  return fmtDate(order.date, days);
}

// ── SVG icons ─────────────────────────────────────────────────────────────────

function IconPackage({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconTruck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const STEP_ICONS: Record<ActiveStep, React.FC<{ className?: string }>> = {
  processing: IconPackage,
  confirmed: IconCheck,
  shipped: IconTruck,
  delivered: IconHome,
};

// ── Sub-components ────────────────────────────────────────────────────────────

function OrderNotFound({ orderId }: { orderId: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-sand"
      >
        <IconPackage className="h-9 w-9 text-sand" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-sm"
      >
        <h2 className="font-heading text-2xl font-medium text-espresso">Order not found</h2>
        <p className="mt-2 font-body text-sm text-warm-gray">
          We couldn&apos;t find an order matching{' '}
          <strong className="text-espresso">#{orderId}</strong>. It may have been removed or the
          link is incorrect.
        </p>
      </motion.div>
      <Link
        href={AppPaths.orders.list}
        className="rounded-full bg-terracotta px-6 py-2.5 font-ui text-sm text-cream shadow-sm transition-all duration-200 hover:bg-terracotta/90 hover:shadow-md"
      >
        View all orders
      </Link>
    </div>
  );
}

function OrderItemRow({ item, index }: { item: OrderItem; index: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      className="flex items-center gap-3"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-sand bg-linen">
        {!imgFailed ? (
          // biome-ignore lint/performance/noImgElement: external image
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              viewBox="0 0 40 40"
              className="h-6 w-6 text-sand"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20 4C11.163 4 4 11.163 4 20s7.163 16 16 16 16-7.163 16-16S28.837 4 20 4zm0 6c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 22.4c-3.333 0-6.293-1.573-8.213-4.027C13.867 26.533 16.84 25.6 20 25.6c3.16 0 6.133.933 8.213 2.773C26.293 30.827 23.333 32.4 20 32.4z" />
            </svg>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-body text-sm font-medium text-espresso">{item.name}</p>
        <p className="font-ui text-xs text-warm-gray">Qty: {item.qty}</p>
      </div>
      <p className="shrink-0 font-heading text-sm font-medium text-espresso">
        रू {(item.price * item.qty).toLocaleString()}
      </p>
    </motion.div>
  );
}

function TrackingTimeline({ order }: { order: Order }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });
  const [copied, setCopied] = useState(false);

  const currentStepIdx =
    order.status === 'cancelled' ? -1 : ACTIVE_STEPS.indexOf(order.status as ActiveStep);

  function copyTracking() {
    if (!order.trackingCode) return;
    navigator.clipboard.writeText(order.trackingCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div ref={containerRef} className="relative">
      {order.status === 'cancelled' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 rounded-2xl border border-warm-gray/20 bg-warm-gray/6 p-6"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-warm-gray/15">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-6 w-6 text-warm-gray"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <div>
            <p className="font-heading text-base font-medium text-warm-gray">Order Cancelled</p>
            <p className="mt-0.5 font-body text-sm text-warm-gray/70">
              This order was cancelled on {fmtDate(order.date, 1)}. If you have questions, please
              contact our support team.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="relative flex flex-col gap-0">
          {/* Animated background progress line */}
          <div
            className="absolute top-6 bottom-6 left-[23px] w-px bg-sand/60 dark:bg-sand/25"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[23px] top-6 w-px origin-top bg-terracotta"
            initial={{ scaleY: 0 }}
            animate={
              isInView ? { scaleY: currentStepIdx / (ACTIVE_STEPS.length - 1) } : { scaleY: 0 }
            }
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ height: `calc(100% - 48px)` }}
            aria-hidden="true"
          />

          {ACTIVE_STEPS.map((step, idx) => {
            const cfg = STEP_CONFIG[step];
            const Icon = STEP_ICONS[step];
            const isDone = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;
            const isFuture = idx > currentStepIdx;
            const stepDate =
              isDone && !isCurrent
                ? fmtDate(order.date, cfg.daysOffset)
                : isCurrent
                  ? 'In progress'
                  : null;

            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.12, ease: 'easeOut' }}
                className="relative flex gap-5 pb-8 last:pb-0"
              >
                {/* Step node */}
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <motion.div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                      isDone
                        ? `${cfg.bgClass} border-transparent`
                        : isFuture
                          ? 'border-sand bg-cream dark:border-sand/30 dark:bg-espresso/20'
                          : 'border-sand bg-cream'
                    } ${isCurrent ? `ring-4 ${cfg.ringClass}` : ''}`}
                    animate={
                      isCurrent
                        ? {
                            boxShadow: [
                              '0 0 0 0 rgba(178,90,62,0)',
                              '0 0 0 8px rgba(178,90,62,0.15)',
                              '0 0 0 0 rgba(178,90,62,0)',
                            ],
                          }
                        : {}
                    }
                    transition={
                      isCurrent ? { duration: 2.5, repeat: Number.POSITIVE_INFINITY } : {}
                    }
                  >
                    <Icon
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isDone ? 'text-cream' : isCurrent ? cfg.colorClass : 'text-sand'
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Step content */}
                <div className="min-w-0 flex-1 pt-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p
                        className={`font-heading text-base font-medium leading-tight transition-colors duration-300 ${
                          isCurrent
                            ? cfg.colorClass
                            : isDone
                              ? 'text-espresso'
                              : 'text-warm-gray/50'
                        }`}
                      >
                        {cfg.label}
                      </p>
                      {isCurrent && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-ui text-[11px] font-semibold ${cfg.bgClass}/15 ${cfg.colorClass}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 animate-pulse rounded-full ${cfg.bgClass}`}
                          />
                          Current step · {cfg.etaLabel}
                        </motion.span>
                      )}
                    </div>
                    {stepDate && (
                      <span className="shrink-0 font-ui text-xs text-warm-gray">{stepDate}</span>
                    )}
                  </div>

                  {(isDone || isCurrent) && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.15 + idx * 0.1 }}
                      className="mt-2 font-body text-sm leading-relaxed text-warm-gray"
                    >
                      {cfg.description}
                    </motion.p>
                  )}

                  {/* Tracking code pill for shipped step */}
                  {step === 'shipped' && isDone && order.trackingCode && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-3 flex flex-wrap items-center gap-2"
                    >
                      <div className="flex items-center gap-2 rounded-xl border border-mocha/25 bg-mocha/8 px-3.5 py-2">
                        <IconTruck className="h-3.5 w-3.5 text-mocha" />
                        <span className="font-ui text-xs font-medium text-mocha">
                          Tracking: {order.trackingCode}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={copyTracking}
                        className="flex items-center gap-1.5 rounded-xl border border-sand bg-cream px-3.5 py-2 font-ui text-xs text-warm-gray transition-all duration-200 hover:border-mocha/40 hover:text-mocha"
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.span
                              key="copied"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="text-sage"
                            >
                              Copied ✓
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              Copy code
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function TrackOrderPage({ orderId }: { orderId: string }) {
  const order = MOCK_ORDERS.find((o) => o.id === orderId);

  if (!order) return <OrderNotFound orderId={orderId} />;

  const eta = getEta(order);
  const shipping = order.total >= 3000 ? 0 : 150;
  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);

  const STATUS_LABEL: Record<OrderStatus, string> = {
    processing: 'Processing',
    confirmed: 'Confirmed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };

  const STATUS_COLORS: Record<
    OrderStatus,
    { text: string; bg: string; border: string; dot: string }
  > = {
    processing: {
      text: 'text-amber',
      bg: 'bg-amber/10',
      border: 'border-amber/30',
      dot: 'bg-amber',
    },
    confirmed: {
      text: 'text-sage',
      bg: 'bg-sage/10',
      border: 'border-sage/30',
      dot: 'bg-sage',
    },
    shipped: {
      text: 'text-mocha',
      bg: 'bg-mocha/10',
      border: 'border-mocha/30',
      dot: 'bg-mocha',
    },
    delivered: {
      text: 'text-terracotta',
      bg: 'bg-terracotta/10',
      border: 'border-terracotta/30',
      dot: 'bg-terracotta',
    },
    cancelled: {
      text: 'text-warm-gray',
      bg: 'bg-warm-gray/10',
      border: 'border-warm-gray/20',
      dot: 'bg-warm-gray',
    },
  };

  const sc = STATUS_COLORS[order.status];

  return (
    <div className="min-h-screen bg-cream dark:bg-cream">
      {/* ── Hero header ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-sand bg-linen/50 dark:border-sand/20 dark:bg-linen/10">
        {/* Subtle texture pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2"
          >
            <Link
              href={AppPaths.orders.list}
              className="flex items-center gap-1.5 font-ui text-xs text-warm-gray transition-colors hover:text-terracotta"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              My Orders
            </Link>
            <span className="font-ui text-xs text-warm-gray/30">›</span>
            <span className="font-ui text-xs text-espresso">Track Order</span>
          </motion.div>

          {/* Order header card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-sand bg-cream/80 p-5 shadow-sm backdrop-blur-sm sm:p-6 dark:border-sand/20 dark:bg-espresso/5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                {/* Order icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-terracotta/10 dark:bg-terracotta/15">
                  <IconPackage className="h-6 w-6 text-terracotta" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-medium text-espresso">#{order.id}</h1>
                  <p className="mt-0.5 font-body text-sm text-warm-gray">
                    Placed on{' '}
                    {new Date(order.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Status badge */}
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-ui text-sm font-semibold ${sc.text} ${sc.bg} ${sc.border} ${order.status === 'processing' ? 'animate-pulse' : ''}`}
                >
                  <span className={`h-2 w-2 rounded-full ${sc.dot}`} aria-hidden="true" />
                  {STATUS_LABEL[order.status]}
                </span>

                {/* Total */}
                <div className="rounded-full border border-sand bg-linen/60 px-4 py-1.5 dark:border-sand/20 dark:bg-linen/10">
                  <span className="font-heading text-base font-medium text-espresso">
                    रू {order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* ETA banner */}
            <AnimatePresence>
              {eta && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <div className="flex items-center gap-3 rounded-xl border border-terracotta/20 bg-terracotta/6 px-4 py-3">
                    <IconClock className="h-4 w-4 shrink-0 text-terracotta" />
                    <p className="font-body text-sm text-espresso">
                      Estimated delivery:{' '}
                      <strong className="font-semibold text-terracotta">{eta}</strong>
                      <span className="ml-2 text-warm-gray">
                        · Delivering from Kathmandu, Nepal
                      </span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          {/* Left: Timeline */}
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-5"
            >
              <h2 className="font-heading text-xl font-medium text-espresso">Order Journey</h2>
              <p className="mt-1 font-body text-sm text-warm-gray">
                Follow your handcrafted pieces from our workshop to your door
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-2xl border border-sand bg-cream p-6 shadow-sm dark:border-sand/20 dark:bg-espresso/3"
            >
              <TrackingTimeline order={order} />
            </motion.div>

            {/* Shipped: map placeholder */}
            {order.status === 'shipped' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-5 overflow-hidden rounded-2xl border border-mocha/20 bg-mocha/5"
              >
                <div className="flex items-center justify-between border-b border-mocha/15 px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <IconTruck className="h-4 w-4 text-mocha" />
                    <span className="font-ui text-sm font-medium text-mocha">Live Tracking</span>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-mocha/10 px-2.5 py-1 font-ui text-[11px] text-mocha">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mocha" />
                    In transit
                  </span>
                </div>
                {/* Decorative route visualization */}
                <div className="relative flex h-32 items-center justify-between overflow-hidden px-8">
                  <div className="absolute inset-0 opacity-5">
                    <svg viewBox="0 0 400 128" className="h-full w-full" aria-hidden="true">
                      <path
                        d="M0 64 Q100 20 200 64 Q300 108 400 64"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="8 4"
                      />
                    </svg>
                  </div>
                  {/* Origin */}
                  <div className="relative z-10 flex flex-col items-center gap-1.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-mocha bg-mocha/10">
                      <IconPackage className="h-5 w-5 text-mocha" />
                    </div>
                    <span className="font-ui text-[11px] font-medium text-mocha">Kathmandu</span>
                    <span className="font-ui text-[10px] text-warm-gray">Origin</span>
                  </div>

                  {/* Animated truck */}
                  <motion.div
                    animate={{ x: ['-20%', '20%', '-10%'] }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                    className="relative z-10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-mocha bg-mocha text-cream shadow-lg">
                      <IconTruck className="h-5 w-5" />
                    </div>
                  </motion.div>

                  {/* Destination */}
                  <div className="relative z-10 flex flex-col items-center gap-1.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-mocha/50 bg-mocha/5">
                      <IconHome className="h-5 w-5 text-mocha/60" />
                    </div>
                    <span className="font-ui text-[11px] font-medium text-warm-gray">
                      Your Door
                    </span>
                    <span className="font-ui text-[10px] text-warm-gray">Destination</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Summary */}
          <div className="flex flex-col gap-5">
            {/* Order items */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="rounded-2xl border border-sand bg-cream p-5 shadow-sm dark:border-sand/20 dark:bg-espresso/3"
            >
              <h3 className="mb-4 font-heading text-base font-medium text-espresso">
                Items ({order.items.length})
              </h3>
              <div className="flex flex-col gap-4">
                {order.items.map((item, i) => (
                  <OrderItemRow key={item.id} item={item} index={i} />
                ))}
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-sand dark:border-sand/20" />

              {/* Summary rows */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-warm-gray">Subtotal</span>
                  <span className="font-body text-sm text-espresso">
                    रू {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-warm-gray">Shipping</span>
                  <span className="font-body text-sm text-sage">
                    {shipping === 0 ? 'Free' : `रू ${shipping}`}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between border-t border-sand pt-2 dark:border-sand/20">
                  <span className="font-heading text-base font-medium text-espresso">Total</span>
                  <span className="font-heading text-lg font-semibold text-terracotta">
                    रू {order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Delivery address (mock) */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="rounded-2xl border border-sand bg-cream p-5 shadow-sm dark:border-sand/20 dark:bg-espresso/3"
            >
              <div className="mb-3 flex items-center gap-2">
                <IconHome className="h-4 w-4 text-terracotta" />
                <h3 className="font-heading text-base font-medium text-espresso">
                  Delivery Address
                </h3>
              </div>
              <div className="space-y-0.5 font-body text-sm text-warm-gray">
                <p className="font-medium text-espresso">Priya Sharma</p>
                <p>House no. 12, Lazimpat Marg</p>
                <p>Kathmandu 44600, Nepal</p>
                <p className="mt-2 text-xs">+977 98-0000-1234</p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="flex flex-col gap-2.5"
            >
              <Link
                href={AppPaths.contact}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-sand bg-cream py-2.5 font-ui text-sm text-espresso transition-all duration-200 hover:border-terracotta/40 hover:text-terracotta dark:border-sand/30 dark:bg-espresso/5"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Contact Support
              </Link>
              <Link
                href={AppPaths.products.list}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-terracotta py-2.5 font-ui text-sm text-cream shadow-sm transition-all duration-200 hover:bg-terracotta/90 hover:shadow-md"
              >
                Continue Shopping
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Handmade note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="rounded-xl border border-sand/60 bg-linen/40 p-4 dark:border-sand/15 dark:bg-linen/8"
            >
              <p className="font-body text-[12px] leading-relaxed text-warm-gray">
                🧶 <strong className="text-espresso">Handcrafted with love</strong> — Every
                Stitchery piece is individually made by skilled artisans in the mountains of Nepal.
                Small variations are a mark of authenticity.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
