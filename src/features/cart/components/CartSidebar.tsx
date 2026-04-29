'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { FallbackImage as Image } from '@/components/common';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  closeSidebar,
  removeItem,
  selectCartCount,
  selectCartIsOpen,
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
} from '../store';
import type { CartItem } from '../types';

// ─── Quantity Stepper ─────────────────────────────────────────────────────────

function QuantityStepper({ item, compact = true }: { item: CartItem; compact?: boolean }) {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`flex items-center overflow-hidden rounded-lg border border-sand ${compact ? 'h-7' : 'h-9'}`}
    >
      <button
        type="button"
        onClick={() =>
          dispatch(updateQuantity({ id: item.id, color: item.color, quantity: item.quantity - 1 }))
        }
        disabled={item.quantity <= 1}
        aria-label="Decrease quantity"
        className="flex items-center justify-center px-2 text-warm-gray transition-colors hover:bg-linen hover:text-espresso disabled:opacity-30"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span
        className={`flex items-center justify-center border-x border-sand font-semibold font-ui text-espresso ${compact ? 'w-7 text-xs' : 'w-9 text-sm'}`}
      >
        {item.quantity}
      </span>
      <button
        type="button"
        onClick={() =>
          dispatch(updateQuantity({ id: item.id, color: item.color, quantity: item.quantity + 1 }))
        }
        disabled={item.quantity >= 10}
        aria-label="Increase quantity"
        className="flex items-center justify-center px-2 text-warm-gray transition-colors hover:bg-linen hover:text-espresso disabled:opacity-30"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

// ─── Sidebar Item ─────────────────────────────────────────────────────────────

function SidebarItem({ item, index }: { item: CartItem; index: number }) {
  const dispatch = useAppDispatch();
  const lineTotal = item.price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="group flex gap-3.5 border-b border-sand/60 pb-4 last:border-0"
    >
      {/* Thumbnail */}
      <Link
        href={AppPaths.products.detail(item.id)}
        className="relative h-[88px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-linen"
        tabIndex={-1}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          sizes="72px"
        />
      </Link>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-semibold font-ui text-[10px] text-terracotta uppercase tracking-[0.15em]">
              {item.category}
            </p>
            <Link href={AppPaths.products.detail(item.id)}>
              <h4 className="mt-0.5 line-clamp-2 font-heading text-[1.05rem] text-espresso leading-snug hover:text-terracotta transition-colors">
                {item.name}
              </h4>
            </Link>
          </div>
          <button
            type="button"
            onClick={() => dispatch(removeItem({ id: item.id, color: item.color }))}
            aria-label={`Remove ${item.name} from cart`}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-warm-gray/50 opacity-0 transition-all duration-200 hover:bg-sand hover:text-espresso group-hover:opacity-100"
          >
            <svg
              width="11"
              height="11"
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

        {/* Color */}
        {item.color && (
          <div className="flex items-center gap-1.5">
            {item.colorHex && (
              <span
                className="h-3 w-3 rounded-full border border-sand shadow-sm"
                style={{ backgroundColor: item.colorHex }}
                aria-hidden="true"
              />
            )}
            <span className="font-body text-[11px] text-warm-gray">{item.color}</span>
          </div>
        )}

        {/* Price + qty row */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <QuantityStepper item={item} compact />
          <div className="text-right">
            <span className="font-heading text-[1.05rem] leading-none">
              <span className="text-terracotta">Rs</span>
              <span className="text-espresso"> {lineTotal.toLocaleString('en-IN')}</span>
            </span>
            {item.quantity > 1 && (
              <p className="font-body text-[10px] text-warm-gray">
                Rs {item.price.toLocaleString('en-IN')} each
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-16 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linen">
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-sand"
          aria-hidden="true"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-cream border-2 border-sand flex items-center justify-center">
          <span className="font-ui text-[9px] text-warm-gray font-bold">0</span>
        </div>
      </div>
      <div>
        <h3 className="font-heading text-[1.5rem] text-espresso">Your bag is empty</h3>
        <p className="mt-1.5 font-body text-sm text-warm-gray leading-relaxed">
          Discover our handcrafted crochet pieces and add something beautiful.
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mt-1 rounded-xl bg-espresso px-7 py-2.5 font-ui text-cream text-sm uppercase tracking-[0.1em] transition-colors hover:bg-mocha dark:bg-terracotta dark:hover:bg-mocha dark:[--color-cream:#faf7f2]"
      >
        Start Shopping
      </button>
    </div>
  );
}

// ─── Main CartSidebar ─────────────────────────────────────────────────────────

export function CartSidebar() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectCartIsOpen);
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const subtotal = useAppSelector(selectCartSubtotal);

  const close = () => dispatch(closeSidebar());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  const freeShippingThreshold = 2000;
  const remaining = freeShippingThreshold - subtotal;
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-espresso/40 backdrop-blur-sm dark:bg-black/60"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 38 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col bg-cream shadow-[−20px_0_60px_rgba(44,26,26,0.18)]"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between border-b border-sand px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linen">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-espresso"
                    aria-hidden="true"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-heading text-[1.3rem] text-espresso leading-none">
                    Your Bag
                  </h2>
                  <p className="mt-0.5 font-body text-[11px] text-warm-gray">
                    {count === 0 ? 'No items' : `${count} item${count !== 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close cart"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-sand text-warm-gray transition-all hover:border-mocha hover:bg-linen hover:text-espresso"
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

            {/* ── Free shipping bar ── */}
            {items.length > 0 && (
              <div className="border-b border-sand/60 bg-linen/70 px-5 py-2.5">
                {remaining > 0 ? (
                  <p className="font-body text-[11px] text-warm-gray">
                    Add{' '}
                    <span className="font-semibold text-espresso">
                      Rs {remaining.toLocaleString('en-IN')}
                    </span>{' '}
                    more for free delivery
                  </p>
                ) : (
                  <p className="font-body text-[11px] text-sage flex items-center gap-1.5">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    You've unlocked free delivery!
                  </p>
                )}
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-sand">
                  <motion.div
                    className="h-full rounded-full bg-sage"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* ── Items list ── */}
            <div className="flex-1 overflow-y-auto px-5 py-4 [scrollbar-width:thin] [scrollbar-color:var(--color-sand)_transparent]">
              {items.length === 0 ? (
                <EmptyCart onClose={close} />
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {items.map((item, i) => (
                      <SidebarItem key={`${item.id}-${item.color}`} item={item} index={i} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* ── Footer ── */}
            {items.length > 0 && (
              <div className="border-t border-sand bg-cream px-5 pb-6 pt-4">
                {/* Subtotal */}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold font-ui text-[10px] text-warm-gray uppercase tracking-[0.14em]">
                      Subtotal
                    </p>
                    <p className="mt-0.5 font-body text-[11px] text-warm-gray">
                      Shipping calculated at checkout
                    </p>
                  </div>
                  <span className="font-heading text-[1.5rem] leading-none">
                    <span className="text-terracotta">Rs</span>
                    <span className="text-espresso"> {subtotal.toLocaleString('en-IN')}</span>
                  </span>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col gap-2.5">
                  <Link
                    href={AppPaths.checkout.index}
                    onClick={close}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-espresso font-ui text-cream text-sm uppercase tracking-[0.1em] transition-colors hover:bg-mocha dark:bg-terracotta dark:hover:bg-mocha dark:[--color-cream:#faf7f2]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    Proceed to Checkout
                  </Link>
                  <Link
                    href={AppPaths.cart}
                    onClick={close}
                    className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-sand font-ui text-espresso text-sm uppercase tracking-[0.1em] transition-all hover:border-mocha hover:bg-linen"
                  >
                    View Full Cart
                  </Link>
                </div>

                {/* Trust line */}
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sage"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span className="font-body text-[10px] text-warm-gray">
                    Secure checkout via eSewa & card
                  </span>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
