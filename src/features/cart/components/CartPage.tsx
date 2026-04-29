'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FallbackImage as Image } from '@/components/common';
import { selectIsInWishlist, toggleWishlist } from '@/features/wishlist';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearCart,
  removeItem,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
} from '../store';
import type { CartItem } from '../types';

// ─── Quantity Stepper ─────────────────────────────────────────────────────────

function QuantityStepper({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-sand">
      <button
        type="button"
        onClick={() =>
          dispatch(updateQuantity({ id: item.id, color: item.color, quantity: item.quantity - 1 }))
        }
        disabled={item.quantity <= 1}
        aria-label="Decrease quantity"
        className="flex h-9 w-9 items-center justify-center text-warm-gray transition-colors hover:bg-linen hover:text-espresso disabled:opacity-30"
      >
        <svg
          width="12"
          height="12"
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
      <span className="flex h-9 w-10 items-center justify-center border-x border-sand font-semibold font-ui text-sm text-espresso">
        {item.quantity}
      </span>
      <button
        type="button"
        onClick={() =>
          dispatch(updateQuantity({ id: item.id, color: item.color, quantity: item.quantity + 1 }))
        }
        disabled={item.quantity >= 10}
        aria-label="Increase quantity"
        className="flex h-9 w-9 items-center justify-center text-warm-gray transition-colors hover:bg-linen hover:text-espresso disabled:opacity-30"
      >
        <svg
          width="12"
          height="12"
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

// ─── Cart Item Card ───────────────────────────────────────────────────────────

function CartItemCard({ item, index }: { item: CartItem; index: number }) {
  const dispatch = useAppDispatch();
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : null;
  const lineTotal = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, height: 0, marginBottom: 0, overflow: 'hidden' }}
      transition={{ duration: 0.3, delay: index * 0.05, layout: { duration: 0.25 } }}
      className="group relative overflow-hidden rounded-2xl border border-sand bg-cream transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(44,26,26,0.08)]"
    >
      {/* Decorative corner thread */}
      <div className="absolute top-0 right-0 h-16 w-16 overflow-hidden">
        <div className="absolute -top-8 -right-8 h-16 w-16 rounded-full bg-linen opacity-60" />
      </div>

      <div className="flex gap-4 p-4 sm:p-5">
        {/* Image */}
        <Link
          href={AppPaths.products.detail(item.id)}
          className="relative shrink-0 overflow-hidden rounded-xl bg-linen"
          style={{ width: 108, height: 130 }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="108px"
          />
          {discount && (
            <span className="absolute top-2 left-2 rounded-full bg-terracotta/90 px-2 py-0.5 font-bold font-ui text-[9px] text-cream shadow-sm">
              -{discount}%
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold font-ui text-[10px] text-terracotta uppercase tracking-[0.16em]">
                {item.category}
              </p>
              <Link href={AppPaths.products.detail(item.id)}>
                <h3 className="mt-0.5 font-heading text-[1.25rem] text-espresso leading-snug transition-colors hover:text-terracotta sm:text-[1.4rem]">
                  {item.name}
                </h3>
              </Link>
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={() => dispatch(removeItem({ id: item.id, color: item.color }))}
              aria-label={`Remove ${item.name}`}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-warm-gray/40 transition-all duration-200 hover:bg-sand hover:text-espresso"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>
          </div>

          {/* Color swatch */}
          {item.color && (
            <div className="mt-1.5 flex items-center gap-1.5">
              {item.colorHex && (
                <span
                  className="h-3.5 w-3.5 rounded-full border border-sand/80 shadow-sm"
                  style={{ backgroundColor: item.colorHex }}
                  aria-hidden="true"
                />
              )}
              <span className="font-body text-[11px] text-warm-gray">{item.color}</span>
            </div>
          )}

          {/* Price display */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-heading text-[1.15rem] leading-none">
              <span className="text-terracotta">Rs</span>
              <span className="text-espresso"> {item.price.toLocaleString('en-IN')}</span>
            </span>
            {item.originalPrice && (
              <span className="font-body text-[11px] text-warm-gray line-through">
                Rs {item.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Bottom row: qty + line total */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
            <QuantityStepper item={item} />
            <div className="text-right">
              <p className="font-body text-[10px] text-warm-gray uppercase tracking-wide">Total</p>
              <span className="font-heading text-[1.35rem] leading-none">
                <span className="text-terracotta">Rs</span>
                <span className="text-espresso"> {lineTotal.toLocaleString('en-IN')}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyCartPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col items-center py-20 text-center"
    >
      {/* Decorative yarn illustration */}
      <div className="relative mb-8">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-linen">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            className="text-sand"
            aria-hidden="true"
          >
            <circle cx="30" cy="30" r="22" stroke="currentColor" strokeWidth="2" />
            <path
              d="M8.5 30c0 0 8-14 21.5-14s21.5 14 21.5 14"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8.5 30c0 0 8 14 21.5 14s21.5-14 21.5-14"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M30 8v44" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.4" />
          </svg>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-cream border-2 border-sand shadow-sm"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-terracotta"
            aria-hidden="true"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </motion.div>
      </div>

      <h2 className="font-heading text-[2rem] text-espresso sm:text-[2.4rem]">
        Your bag is beautifully empty
      </h2>
      <p className="mt-3 max-w-sm font-body text-sm text-warm-gray leading-relaxed">
        Explore our collection of handcrafted crochet flowers, keyrings, and sweaters — each made
        with love by artisans in Nepal.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={AppPaths.products.list}
          className="rounded-xl bg-espresso px-8 py-3 font-ui text-cream text-sm uppercase tracking-[0.1em] transition-colors hover:bg-mocha dark:bg-terracotta dark:hover:bg-mocha dark:[--color-cream:#faf7f2]"
        >
          Explore Shop
        </Link>
        <Link
          href={AppPaths.home}
          className="rounded-xl border border-sand px-8 py-3 font-ui text-espresso text-sm uppercase tracking-[0.1em] transition-all hover:border-mocha hover:bg-linen"
        >
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Order Summary ────────────────────────────────────────────────────────────

function OrderSummary({ subtotal, itemCount }: { subtotal: number; itemCount: number }) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const shipping = subtotal >= 2000 ? 0 : 150;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + shipping;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'CROCHET10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="sticky top-6 rounded-2xl border border-sand bg-cream overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-sand bg-linen/60 px-5 py-4">
        <h2 className="font-heading text-[1.3rem] text-espresso">Order Summary</h2>
        <p className="mt-0.5 font-body text-[11px] text-warm-gray">
          {itemCount} item{itemCount !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="px-5 py-5">
        {/* Price breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-warm-gray">Subtotal</span>
            <span className="font-ui text-sm text-espresso">
              Rs {subtotal.toLocaleString('en-IN')}
            </span>
          </div>

          {promoApplied && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5 font-body text-sm text-sage">
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
                Promo (CROCHET10)
              </span>
              <span className="font-ui text-sm text-sage">
                −Rs {discount.toLocaleString('en-IN')}
              </span>
            </motion.div>
          )}

          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-warm-gray">Shipping</span>
            {shipping === 0 ? (
              <span className="font-ui text-sm text-sage">Free</span>
            ) : (
              <span className="font-ui text-sm text-espresso">
                Rs {shipping.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {shipping > 0 && (
            <div className="rounded-lg bg-linen/80 px-3 py-2">
              <p className="font-body text-[10px] text-warm-gray">
                Add{' '}
                <span className="font-semibold text-espresso">
                  Rs {(2000 - subtotal).toLocaleString('en-IN')}
                </span>{' '}
                more for free delivery
              </p>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-sand">
                <motion.div
                  className="h-full rounded-full bg-sage/70"
                  initial={{ width: 0 }}
                  animate={{ width: `${(subtotal / 2000) * 100}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="my-4 h-px bg-sand" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-semibold font-ui text-[11px] text-espresso uppercase tracking-[0.14em]">
            Total
          </span>
          <span className="font-heading text-[1.6rem] leading-none">
            <span className="text-terracotta">Rs</span>
            <span className="text-espresso"> {total.toLocaleString('en-IN')}</span>
          </span>
        </div>

        <p className="mt-1 font-body text-[10px] text-warm-gray">Including VAT where applicable</p>

        <div className="my-4 h-px bg-sand" />

        {/* Promo code */}
        <div className="mb-4">
          <p className="mb-2 font-semibold font-ui text-[10px] text-espresso uppercase tracking-[0.14em]">
            Promo Code
          </p>
          {promoApplied ? (
            <div className="flex items-center gap-2 rounded-xl border border-sage/40 bg-sage/8 px-3 py-2.5">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-sage shrink-0"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="font-ui text-sm text-sage">CROCHET10 applied — 10% off!</span>
              <button
                type="button"
                onClick={() => {
                  setPromoApplied(false);
                  setPromoCode('');
                }}
                className="ml-auto font-body text-[10px] text-warm-gray underline hover:text-espresso"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handlePromo()}
                placeholder="Enter code"
                className="h-9 min-w-0 flex-1 rounded-xl border border-sand bg-linen/40 px-3 font-ui text-sm text-espresso placeholder-warm-gray/50 outline-none transition-colors focus:border-mocha focus:bg-cream"
              />
              <button
                type="button"
                onClick={handlePromo}
                className="h-9 rounded-xl border border-sand px-3.5 font-ui text-xs text-espresso uppercase tracking-[0.1em] transition-all hover:border-mocha hover:bg-linen"
              >
                Apply
              </button>
            </div>
          )}
          {promoError && (
            <p className="mt-1.5 font-body text-[11px] text-terracotta">{promoError}</p>
          )}
        </div>

        {/* Checkout CTA */}
        <Link
          href={AppPaths.checkout.index}
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

        {/* Payment methods */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {['eSewa', 'Khalti', 'Card'].map((method) => (
              <span
                key={method}
                className="rounded-md border border-sand px-2.5 py-1 font-ui text-[10px] text-warm-gray"
              >
                {method}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 font-body text-[10px] text-warm-gray">
            <svg
              width="10"
              height="10"
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
            256-bit SSL encrypted checkout
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Suggested Products ───────────────────────────────────────────────────────

type SuggestedProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: 'Bestseller' | 'New' | 'Sale' | 'Limited';
};

const BADGE_STYLES = {
  Bestseller: 'bg-amber text-espresso',
  New: 'bg-sage text-cream',
  Sale: 'bg-terracotta text-cream',
  Limited: 'bg-mocha text-cream',
} as const;

const SUGGESTED_POOL: SuggestedProduct[] = [
  {
    id: '2',
    name: 'Sunflower Crochet Key Ring',
    category: 'Key Rings',
    price: 349,
    rating: 4.8,
    reviewCount: 234,
    image:
      'https://images.unsplash.com/photo-1753366556705-1f657d2fa4db?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
  },
  {
    id: '3',
    name: 'Hand-Knitted Woolen Sweater',
    category: 'Sweaters',
    price: 3499,
    originalPrice: 4299,
    rating: 4.9,
    reviewCount: 89,
    image:
      'https://images.unsplash.com/photo-1519412849983-957822373d02?auto=format&fit=crop&w=600&q=80',
    badge: 'Sale',
  },
  {
    id: '4',
    name: 'Crochet Daisy Hair Clips',
    category: 'Accessories',
    price: 599,
    rating: 4.7,
    reviewCount: 178,
    image:
      'https://images.unsplash.com/photo-1602773974733-b56200c8653f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    name: 'Mini Bear Crochet Charm',
    category: 'Key Rings',
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviewCount: 312,
    image:
      'https://images.unsplash.com/photo-1671212684942-5c8a3dc3234e?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
  },
  {
    id: '6',
    name: 'Alpine Knit Cardigan',
    category: 'Sweaters',
    price: 4299,
    rating: 4.9,
    reviewCount: 67,
    image:
      'https://images.unsplash.com/photo-1630238083594-43d3846190d7?auto=format&fit=crop&w=600&q=80',
    badge: 'Limited',
  },
  {
    id: '7',
    name: 'Lavender Floral Bouquet',
    category: 'Crochet Flowers',
    price: 999,
    rating: 4.6,
    reviewCount: 143,
    image:
      'https://images.unsplash.com/photo-1682954013913-25fe41e180c0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '8',
    name: 'Rainbow Yarn Key Tassel',
    category: 'Key Rings',
    price: 279,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 198,
    image:
      'https://images.unsplash.com/photo-1662219708541-3a74d96330eb?auto=format&fit=crop&w=600&q=80',
    badge: 'Sale',
  },
  {
    id: '9',
    name: 'Crochet Rose Arrangement',
    category: 'Crochet Flowers',
    price: 1099,
    rating: 4.8,
    reviewCount: 112,
    image:
      'https://images.unsplash.com/photo-1689999015707-7734e1962dd4?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
  },
];

function SuggestedProductCard({ product, index }: { product: SuggestedProduct; index: number }) {
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id));
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.07, ease: 'easeOut' }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-cream shadow-[0_2px_12px_rgba(44,26,26,0.07)] transition-shadow duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-300 hover:shadow-[0_8px_32px_rgba(44,26,26,0.13)] hover:after:scale-x-100"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-linen">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent" />

        {product.badge && (
          <span
            className={`absolute top-3 left-3 -rotate-1 rounded-sm px-2.5 py-0.5 font-bold font-ui text-[10px] tracking-wider shadow-sm ${BADGE_STYLES[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {discount && (
          <span className="absolute top-3 right-9 rounded-full bg-terracotta/90 px-2 py-0.5 font-bold font-ui text-[9px] text-cream shadow-sm">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          onClick={() =>
            dispatch(
              toggleWishlist({
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                originalPrice: product.originalPrice,
                rating: product.rating,
                reviewCount: product.reviewCount,
                image: product.image,
                badge: product.badge,
                addedAt: new Date().toISOString(),
              }),
            )
          }
          aria-label={
            isInWishlist
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-cream/70 text-warm-gray opacity-60 backdrop-blur-sm transition-all duration-200 hover:bg-cream hover:text-terracotta hover:opacity-100 group-hover:opacity-100"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill={isInWishlist ? '#C1644F' : 'none'}
            stroke={isInWishlist ? '#C1644F' : 'currentColor'}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <Link
          href={AppPaths.products.detail(product.id)}
          aria-label={`View ${product.name}`}
          className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-espresso/95 py-3 font-ui text-[11px] text-cream uppercase tracking-[0.1em] backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0 dark:bg-[#0e0904]/95 dark:[--color-cream:#faf7f2]"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Add to Cart
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-1 px-3.5 pb-3.5 pt-3">
        <p className="font-semibold font-ui text-[9px] text-terracotta uppercase tracking-[0.18em]">
          {product.category}
        </p>
        <h3 className="font-heading text-[1.05rem] text-espresso leading-snug">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1.5">
          <div
            className="flex items-center gap-1.5"
            role="img"
            aria-label={`${product.rating} stars`}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#D4A447" aria-hidden="true">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <span className="font-semibold font-ui text-[11px] text-espresso">
              {product.rating}
            </span>
            <span className="font-body text-[10px] text-warm-gray">({product.reviewCount})</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-lg leading-none">
              <span className="text-terracotta">Rs</span>
              <span className="text-espresso"> {product.price.toLocaleString('en-IN')}</span>
            </span>
            {product.originalPrice && (
              <span className="font-body text-[10px] text-warm-gray line-through">
                {product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SuggestedProducts({ cartItemIds }: { cartItemIds: string[] }) {
  const visible = SUGGESTED_POOL.filter((p) => !cartItemIds.includes(p.id)).slice(0, 4);
  if (visible.length === 0) return null;

  return (
    <section className="border-t border-sand bg-linen/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 flex items-end justify-between gap-4"
        >
          <div>
            <p className="font-semibold font-ui text-[10px] text-terracotta uppercase tracking-[0.2em]">
              Handpicked for you
            </p>
            <h2 className="mt-1 font-heading text-[2rem] text-espresso leading-tight lg:text-[2.4rem]">
              Complete Your Collection
            </h2>
          </div>
          <Link
            href={AppPaths.products.list}
            className="hidden shrink-0 font-ui text-[11px] text-warm-gray uppercase tracking-[0.14em] underline underline-offset-2 transition-colors hover:text-terracotta sm:block"
          >
            View all →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {visible.map((product, i) => (
            <SuggestedProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main CartPage ────────────────────────────────────────────────────────────

export function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const subtotal = useAppSelector(selectCartSubtotal);

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-semibold font-ui text-[10px] text-terracotta uppercase tracking-[0.2em]">
              Your Selection
            </p>
            <h1 className="mt-1 font-heading text-[2.2rem] text-espresso leading-tight sm:text-[2.8rem]">
              Shopping Bag
              {count > 0 && (
                <span className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-terracotta font-ui text-[13px] text-cream">
                  {count}
                </span>
              )}
            </h1>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              className="font-body text-[11px] text-warm-gray underline underline-offset-2 transition-colors hover:text-terracotta"
            >
              Clear all items
            </button>
          )}
        </motion.div>

        {items.length === 0 ? (
          <EmptyCartPage />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* ── Items column ── */}
            <div>
              <AnimatePresence mode="popLayout">
                {items.map((item, i) => (
                  <motion.div key={`${item.id}-${item.color}`} className="mb-4 last:mb-0">
                    <CartItemCard item={item} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue shopping */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Link
                  href={AppPaths.products.list}
                  className="inline-flex items-center gap-2 font-ui text-[11px] text-warm-gray uppercase tracking-[0.14em] transition-colors hover:text-terracotta"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                  Continue Shopping
                </Link>
              </motion.div>

              {/* Artisan note */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6 flex items-start gap-3 rounded-2xl border border-sand/60 bg-linen/40 px-5 py-4"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose/15">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-rose"
                    aria-hidden="true"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold font-ui text-[11px] text-espresso">
                    Handmade with love in Kathmandu Valley
                  </p>
                  <p className="mt-0.5 font-body text-[11px] text-warm-gray leading-relaxed">
                    Each piece is individually crafted by skilled artisans. Minor variations are a
                    mark of authenticity, not a defect.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* ── Order summary column ── */}
            <div>
              <OrderSummary subtotal={subtotal} itemCount={count} />
            </div>
          </div>
        )}
      </div>
      <SuggestedProducts cartItemIds={items.map((i) => i.id)} />
    </div>
  );
}
