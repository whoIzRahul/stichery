'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FallbackImage as Image } from '@/components/common';
import { addItem } from '@/features/cart';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearWishlist,
  removeFromWishlist,
  selectWishlistCount,
  selectWishlistItems,
} from '../store';
import type { WishlistItem } from '../types';

// ─── Category accent colours ──────────────────────────────────────────────────

const CATEGORY_ACCENT: Record<string, { bg: string; text: string; border: string }> = {
  'Crochet Flowers': {
    bg: 'bg-terracotta/12',
    text: 'text-terracotta',
    border: 'border-l-terracotta',
  },
  'Key Rings': {
    bg: 'bg-amber/15',
    text: 'text-amber',
    border: 'border-l-amber',
  },
  Sweaters: { bg: 'bg-mocha/12', text: 'text-mocha', border: 'border-l-mocha' },
  Accessories: { bg: 'bg-sage/15', text: 'text-sage', border: 'border-l-sage' },
};

const DEFAULT_ACCENT = {
  bg: 'bg-warm-gray/10',
  text: 'text-warm-gray',
  border: 'border-l-warm-gray',
};

function getCategoryAccent(category: string) {
  return CATEGORY_ACCENT[category] ?? DEFAULT_ACCENT;
}

// ─── Torn paper SVG edge ──────────────────────────────────────────────────────

function TornEdge() {
  return (
    <svg
      viewBox="0 0 400 22"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 h-5 w-full"
      aria-hidden="true"
    >
      <path
        d="M0,22 L12,9 L28,18 L46,5 L64,16 L82,4 L98,15 L116,6 L132,17 L150,3 L168,14 L184,7 L200,18 L218,5 L236,15 L252,4 L270,16 L286,6 L304,17 L320,4 L338,13 L356,5 L374,16 L390,8 L400,14 L400,22 Z"
        fill="var(--color-cream)"
      />
    </svg>
  );
}

// ─── Wishlist Card ────────────────────────────────────────────────────────────

function WishlistCard({ item, index }: { item: WishlistItem; index: number }) {
  const dispatch = useAppDispatch();
  const accent = getCategoryAccent(item.category);
  const [movedToCart, setMovedToCart] = useState(false);

  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : null;

  const handleMoveToCart = () => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        originalPrice: item.originalPrice,
        quantity: 1,
        image: item.image,
      }),
    );
    setMovedToCart(true);
    setTimeout(() => {
      dispatch(removeFromWishlist(item.id));
    }, 900);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.22 } }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06, ease: 'easeOut' }}
      whileHover={{ transition: { duration: 0.2 } }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-sand/70 border-l-[3px] bg-cream shadow-[0_3px_18px_rgba(44,26,26,0.06)] transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(44,26,26,0.13)] ${accent.border}`}
    >
      {/* ── Image section ── */}
      <div className="relative aspect-3/4 overflow-hidden bg-linen">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-espresso/50 via-espresso/10 to-transparent" />

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 -rotate-1 rounded-sm px-2.5 py-1 font-bold font-ui text-[9px] uppercase tracking-widest shadow-sm ${accent.bg} ${accent.text} backdrop-blur-[2px]`}
        >
          {item.category}
        </span>

        {/* Remove button */}
        <button
          type="button"
          onClick={() => dispatch(removeFromWishlist(item.id))}
          aria-label={`Remove ${item.name} from wishlist`}
          className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-cream/30 bg-espresso/50 text-cream/70 backdrop-blur-sm transition-all duration-200 hover:border-cream/60 hover:bg-espresso/80 hover:text-cream dark:bg-black/50 dark:hover:bg-black/70 dark:[--color-cream:#faf7f2]"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Saved heart indicator */}
        <div className="absolute bottom-10 right-3 flex items-center gap-1 rounded-full bg-cream/80 px-2 py-1 backdrop-blur-sm">
          <motion.svg
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="#C1644F"
            stroke="#C1644F"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </motion.svg>
          <span className="font-ui text-[9px] font-semibold text-terracotta">Saved</span>
        </div>

        {/* Torn paper edge */}
        <TornEdge />
      </div>

      {/* ── Content section ── */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        {/* Product name */}
        <Link href={AppPaths.products.detail(item.id)}>
          <h3 className="font-heading text-[1.2rem] text-espresso leading-snug transition-colors hover:text-terracotta">
            {item.name}
          </h3>
        </Link>

        {/* Rating */}
        <div
          className="mt-1.5 flex items-center gap-1.5"
          role="img"
          aria-label={`${item.rating} out of 5 stars, ${item.reviewCount} reviews`}
        >
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill={item.rating >= s ? '#D4A447' : 'none'}
                stroke="#D4A447"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
          <span className="font-semibold font-ui text-[11px] text-espresso">{item.rating}</span>
          <span className="font-body text-[10px] text-warm-gray">({item.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-heading text-[1.25rem] leading-none">
            <span className="text-terracotta">Rs</span>
            <span className="text-espresso"> {item.price.toLocaleString('en-IN')}</span>
          </span>
          {item.originalPrice && (
            <span className="font-body text-[11px] text-warm-gray line-through">
              {item.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {discount && (
            <span className="rounded-full bg-terracotta/12 px-2 py-0.5 font-semibold font-ui text-[9px] text-terracotta">
              -{discount}%
            </span>
          )}
        </div>

        {/* Decorative stitch divider */}
        <div className="my-3 flex items-center gap-1" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: decorative static elements
              key={i}
              className="h-px flex-1 bg-sand"
              style={{ opacity: i % 2 === 0 ? 1 : 0.3 }}
            />
          ))}
        </div>

        {/* Move to cart button */}
        <button
          type="button"
          onClick={handleMoveToCart}
          disabled={movedToCart}
          className={`mt-auto flex h-10 w-full items-center justify-center gap-2 rounded-xl font-ui text-[11px] uppercase tracking-widest transition-all duration-300 ${
            movedToCart
              ? 'bg-sage/20 text-sage cursor-default'
              : 'bg-espresso text-cream hover:bg-mocha dark:bg-terracotta dark:hover:bg-mocha dark:[--color-cream:#faf7f2]'
          }`}
        >
          <AnimatePresence mode="wait">
            {movedToCart ? (
              <motion.span
                key="done"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2"
              >
                <svg
                  width="13"
                  height="13"
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
                Moved to Bag
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2"
              >
                <svg
                  width="13"
                  height="13"
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
                Move to Bag
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.article>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyWishlist() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center py-20 text-center"
    >
      {/* Floating hearts illustration */}
      <div className="relative mb-8 flex h-36 w-36 items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-linen" />
        {/* Central heart */}
        <motion.svg
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          width="52"
          height="52"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute text-sand"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </motion.svg>
        {/* Floating mini hearts */}
        {[
          { delay: 0, x: -36, y: -28, size: 14, opacity: 0.3 },
          { delay: 0.7, x: 32, y: -20, size: 10, opacity: 0.2 },
          { delay: 1.4, x: -24, y: 24, size: 8, opacity: 0.25 },
          { delay: 0.4, x: 28, y: 26, size: 12, opacity: 0.2 },
        ].map((h) => (
          <motion.svg
            key={`${h.x}-${h.y}`}
            animate={{
              y: [0, -8, 0],
              opacity: [h.opacity, h.opacity * 0.5, h.opacity],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: h.delay,
              ease: 'easeInOut',
            }}
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill="#D4927A"
            className="absolute"
            style={{
              left: `calc(50% + ${h.x}px)`,
              top: `calc(50% + ${h.y}px)`,
            }}
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </motion.svg>
        ))}
      </div>

      <h2 className="font-heading text-[2rem] text-espresso sm:text-[2.4rem]">Nothing saved yet</h2>
      <p className="mt-3 max-w-sm font-body text-sm text-warm-gray leading-relaxed">
        Tap the heart on any product to save it here. Your personal collection of beautiful crochet
        pieces awaits.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={AppPaths.products.list}
          className="rounded-xl bg-espresso px-8 py-3 font-ui text-cream text-sm uppercase tracking-[0.1em] transition-colors hover:bg-mocha dark:bg-terracotta dark:hover:bg-mocha dark:[--color-cream:#faf7f2]"
        >
          Browse Shop
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

// ─── Main WishlistPage ────────────────────────────────────────────────────────

export function WishlistPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistItems);
  const count = useAppSelector(selectWishlistCount);

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
              Your Saved Pieces
            </p>
            <h1 className="mt-1 font-heading text-[2.2rem] text-espresso leading-tight sm:text-[2.8rem]">
              Wishlist
              {count > 0 && (
                <span className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-terracotta/12 font-ui text-[13px] text-terracotta">
                  {count}
                </span>
              )}
            </h1>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => dispatch(clearWishlist())}
                className="font-body text-[11px] text-warm-gray underline underline-offset-2 transition-colors hover:text-terracotta"
              >
                Clear all
              </button>
            </div>
          )}
        </motion.div>

        {items.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, i) => (
                  <WishlistCard key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Continue shopping link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center justify-between gap-4 border-t border-sand pt-6"
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
                Continue Browsing
              </Link>
              <Link
                href={AppPaths.cart}
                className="inline-flex items-center gap-2 font-ui text-[11px] text-warm-gray uppercase tracking-[0.14em] transition-colors hover:text-terracotta"
              >
                View Bag
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
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
