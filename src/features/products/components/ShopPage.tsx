'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { FallbackImage as Image } from '@/components/common';
import { selectIsInWishlist, toggleWishlist } from '@/features/wishlist';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// ─── Types ──────────────────────────────────────────────────────────────────

type Badge = 'Bestseller' | 'New' | 'Sale' | 'Limited' | 'Staff Pick';
type CategorySlug =
  | 'all'
  | 'flowers'
  | 'key-rings'
  | 'sweaters'
  | 'accessories'
  | 'yarn'
  | 'custom';
type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
type PriceRange = 'all' | 'under-500' | '500-1500' | '1500-3000' | 'above-3000';

type Product = {
  id: string;
  name: string;
  category: string;
  categorySlug: CategorySlug;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: Badge;
};

type FilterState = {
  category: CategorySlug;
  priceRange: PriceRange;
  badges: Badge[];
  sort: SortOption;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const PRODUCTS_PER_PAGE = 12;

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  priceRange: 'all',
  badges: [],
  sort: 'recommended',
};

const badgeStyles: Record<Badge, string> = {
  Bestseller: 'bg-amber text-espresso',
  New: 'bg-sage text-cream',
  Sale: 'bg-terracotta text-cream',
  Limited: 'bg-mocha text-cream',
  'Staff Pick': 'bg-rose text-espresso',
};

const CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: 'all', label: 'All Products' },
  { slug: 'flowers', label: 'Crochet Flowers' },
  { slug: 'key-rings', label: 'Key Rings & Charms' },
  { slug: 'sweaters', label: 'Sweaters & Knitwear' },
  { slug: 'accessories', label: 'Accessories' },
  { slug: 'yarn', label: 'Yarn & Thread' },
  { slug: 'custom', label: 'Custom Gifts' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const PRICE_RANGES: { value: PriceRange; label: string }[] = [
  { value: 'all', label: 'All Prices' },
  { value: 'under-500', label: 'Under रू 500' },
  { value: '500-1500', label: 'रू 500 – रू 1,500' },
  { value: '1500-3000', label: 'रू 1,500 – रू 3,000' },
  { value: 'above-3000', label: 'Above रू 3,000' },
];

const ALL_BADGES: Badge[] = ['Bestseller', 'New', 'Sale', 'Limited', 'Staff Pick'];

// ─── Product Data ────────────────────────────────────────────────────────────

const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Himalayan Rose Bouquet',
    category: 'Crochet Flowers',
    categorySlug: 'flowers',
    price: 1299,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 156,
    image:
      'https://images.unsplash.com/photo-700170447159-9d2d0da133a5?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
  },
  {
    id: '2',
    name: 'Sunflower Crochet Key Ring',
    category: 'Key Rings',
    categorySlug: 'key-rings',
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
    categorySlug: 'sweaters',
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
    categorySlug: 'accessories',
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
    categorySlug: 'key-rings',
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
    categorySlug: 'sweaters',
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
    categorySlug: 'flowers',
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
    categorySlug: 'key-rings',
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
    categorySlug: 'flowers',
    price: 1099,
    rating: 4.8,
    reviewCount: 112,
    image:
      'https://images.unsplash.com/photo-1689999015707-7734e1962dd4?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
  },
  {
    id: '10',
    name: 'Sunflower Key Ring Set',
    category: 'Key Rings',
    categorySlug: 'key-rings',
    price: 699,
    originalPrice: 999,
    rating: 4.7,
    reviewCount: 88,
    image:
      'https://images.unsplash.com/photo-1716400128984-3681f2005d22?auto=format&fit=crop&w=600&q=80',
    badge: 'Sale',
  },
  {
    id: '11',
    name: 'Chunky Knit Woolen Scarf',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 1499,
    rating: 4.9,
    reviewCount: 54,
    image:
      'https://images.unsplash.com/photo-1560198598-8382ff5e7318?auto=format&fit=crop&w=600&q=80',
    badge: 'Staff Pick',
  },
  {
    id: '12',
    name: 'Peony Crochet Bouquet',
    category: 'Crochet Flowers',
    categorySlug: 'flowers',
    price: 1599,
    rating: 4.8,
    reviewCount: 76,
    image:
      'https://images.unsplash.com/photo-1689999015579-aaeaba5ebf69?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '13',
    name: 'Himalayan Wool Beanie',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 799,
    rating: 4.7,
    reviewCount: 124,
    image:
      'https://images.unsplash.com/photo-1753370474663-1b0ad622c5fc?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
  },
  {
    id: '14',
    name: 'Cherry Blossom Key Charm',
    category: 'Key Rings',
    categorySlug: 'key-rings',
    price: 449,
    rating: 4.6,
    reviewCount: 167,
    image:
      'https://images.unsplash.com/photo-1753366556705-1f657d2fa4db?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '15',
    name: 'Mustang Woolen Cardigan',
    category: 'Sweaters',
    categorySlug: 'sweaters',
    price: 5299,
    rating: 5.0,
    reviewCount: 43,
    image:
      'https://images.unsplash.com/photo-1610177364662-c2f836b710ee?auto=format&fit=crop&w=600&q=80',
    badge: 'Limited',
  },
  {
    id: '16',
    name: 'Crochet Mushroom Charm',
    category: 'Key Rings',
    categorySlug: 'key-rings',
    price: 329,
    rating: 4.8,
    reviewCount: 203,
    image:
      'https://images.unsplash.com/photo-1671212684942-5c8a3dc3234e?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
  },
  {
    id: '17',
    name: 'Dried Flower Wall Wreath',
    category: 'Crochet Flowers',
    categorySlug: 'flowers',
    price: 2199,
    rating: 4.9,
    reviewCount: 62,
    image:
      'https://images.unsplash.com/photo-1700170447159-9d2d0da133a5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '18',
    name: 'Rainbow Cotton Yarn Bundle',
    category: 'Yarn & Thread',
    categorySlug: 'yarn',
    price: 599,
    rating: 4.6,
    reviewCount: 91,
    image:
      'https://images.unsplash.com/photo-1576376262099-6ec3ed655f52?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '19',
    name: 'Custom Name Keyring Tag',
    category: 'Custom Gifts',
    categorySlug: 'custom',
    price: 799,
    rating: 4.9,
    reviewCount: 287,
    image:
      'https://images.unsplash.com/photo-1732391928574-117e1d266084?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
  },
  {
    id: '20',
    name: 'Crochet Tulip Bouquet',
    category: 'Crochet Flowers',
    categorySlug: 'flowers',
    price: 899,
    originalPrice: 1099,
    rating: 4.7,
    reviewCount: 138,
    image:
      'https://images.unsplash.com/photo-1682954013913-25fe41e180c0?auto=format&fit=crop&w=600&q=80',
    badge: 'Sale',
  },
  {
    id: '21',
    name: 'Lace Crochet Table Runner',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 1299,
    rating: 4.8,
    reviewCount: 49,
    image:
      'https://images.unsplash.com/photo-1602773974733-b56200c8653f?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
  },
  {
    id: '22',
    name: 'Himalayan Wool Yarn',
    category: 'Yarn & Thread',
    categorySlug: 'yarn',
    price: 849,
    rating: 4.5,
    reviewCount: 73,
    image:
      'https://images.unsplash.com/photo-1576376262099-6ec3ed655f52?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '23',
    name: 'Mini Yak Crochet Plushie',
    category: 'Custom Gifts',
    categorySlug: 'custom',
    price: 649,
    rating: 5.0,
    reviewCount: 184,
    image:
      'https://images.unsplash.com/photo-1671212684942-5c8a3dc3234e?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
  },
  {
    id: '24',
    name: 'Sherpa Knit Pullover',
    category: 'Sweaters',
    categorySlug: 'sweaters',
    price: 3799,
    rating: 4.8,
    reviewCount: 55,
    image:
      'https://images.unsplash.com/photo-1554583826-08610bcb6c3a?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="img"
      aria-label={`${rating} out of 5, ${count} reviews`}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="#D4A447" aria-hidden="true">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
      <span className="font-semibold font-ui text-[11px] text-espresso">{rating}</span>
      <span className="font-body text-[10px] text-warm-gray">({count})</span>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id));
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: (index % PRODUCTS_PER_PAGE) * 0.04,
        ease: 'easeOut',
      }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-cream shadow-[0_2px_12px_rgba(44,26,26,0.07)] transition-shadow duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-300 after:ease-out hover:shadow-[0_8px_32px_rgba(44,26,26,0.14)] hover:after:scale-x-100"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-linen">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent" />

        {product.badge && (
          <span
            className={`absolute top-3 left-3 -rotate-1 rounded-sm px-2.5 py-0.5 font-bold font-ui text-[10px] tracking-wider shadow-sm ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {discount && (
          <span className="absolute top-3 right-10 rounded-full bg-terracotta/90 px-2 py-0.5 font-bold font-ui text-[10px] text-cream shadow-sm">
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
            width="16"
            height="16"
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
          aria-label={`Add ${product.name} to cart`}
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

      <div className="flex flex-col gap-1 px-3.5 pt-3 pb-3.5">
        <p className="font-semibold font-ui text-[9px] text-terracotta uppercase tracking-[0.18em]">
          {product.category}
        </p>
        <h3 className="font-heading text-[1.05rem] text-espresso leading-snug">{product.name}</h3>
        <div className="mt-1 flex items-center justify-between gap-2">
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-lg leading-none">
              <span className="text-terracotta">रू</span>
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

// ─── Shop Hero ────────────────────────────────────────────────────────────────

function ShopHero({
  activeCategory,
  total,
  onCategoryChange,
}: {
  activeCategory: CategorySlug;
  total: number;
  onCategoryChange: (slug: CategorySlug) => void;
}) {
  return (
    <div
      className="relative overflow-hidden bg-linen"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(193,100,79,0.08) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-0 sm:px-6 lg:px-8 lg:pt-14">
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-2 font-ui text-[11px] text-warm-gray uppercase tracking-widest">
          <Link href={AppPaths.home} className="transition-colors hover:text-terracotta">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-espresso">Shop</span>
        </nav>

        {/* Title row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="font-heading text-[2.8rem] text-espresso leading-none tracking-tight sm:text-[3.6rem]"
            >
              Our Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 font-body text-sm text-warm-gray"
            >
              {total} handmade items from Nepal — made with love
            </motion.p>
          </div>

          {/* Decorative yarn mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            aria-hidden="true"
            className="hidden shrink-0 sm:block"
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              role="img"
              aria-label="Decorative yarn illustration"
            >
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#C1644F"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <circle cx="32" cy="32" r="18" stroke="#D4927A" strokeWidth="1" opacity="0.5" />
              <path
                d="M16 28 Q32 20 48 28"
                stroke="#C1644F"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M14 36 Q32 28 50 36"
                stroke="#D4927A"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M16 44 Q32 36 48 44"
                stroke="#C1644F"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
        </div>

        {/* Category quick-nav pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-8 flex gap-2 overflow-x-auto pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onCategoryChange(cat.slug)}
              className={`shrink-0 rounded-full border px-4 py-2 font-ui text-xs transition-all duration-200 ${
                activeCategory === cat.slug
                  ? 'border-terracotta bg-terracotta text-cream shadow-sm'
                  : 'border-sand bg-cream/70 text-warm-gray hover:border-mocha hover:text-espresso'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Bottom border */}
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-sand to-transparent" />
      </div>
    </div>
  );
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────

function FilterPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}) {
  const activeCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.priceRange !== 'all' ? 1 : 0) +
    filters.badges.length;

  const categoryCounts = useMemo(() => {
    const map: Partial<Record<CategorySlug, number>> = {
      all: ALL_PRODUCTS.length,
    };
    for (const p of ALL_PRODUCTS) {
      map[p.categorySlug] = (map[p.categorySlug] ?? 0) + 1;
    }
    return map;
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* Category */}
      <div>
        <p className="mb-2.5 font-semibold font-ui text-[10px] text-espresso uppercase tracking-[0.2em]">
          Category
        </p>
        <div className="flex flex-col">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onChange({ ...filters, category: cat.slug })}
              className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-left transition-all duration-150 ${
                filters.category === cat.slug
                  ? 'bg-terracotta/10 text-terracotta'
                  : 'text-warm-gray hover:bg-cream hover:text-espresso'
              }`}
            >
              <span className="font-ui text-[13px]">{cat.label}</span>
              <span
                className={`font-ui text-[11px] ${filters.category === cat.slug ? 'text-terracotta/60' : 'text-sand'}`}
              >
                {categoryCounts[cat.slug] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-sand" />

      {/* Price Range */}
      <div>
        <p className="mb-2.5 font-semibold font-ui text-[10px] text-espresso uppercase tracking-[0.2em]">
          Price Range
        </p>
        <div className="flex flex-col gap-2">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.value}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 hover:bg-cream"
            >
              <input
                type="radio"
                name="price-range"
                checked={filters.priceRange === range.value}
                onChange={() => onChange({ ...filters, priceRange: range.value })}
                className="h-3.5 w-3.5 accent-terracotta"
              />
              <span
                className={`font-body text-sm transition-colors ${
                  filters.priceRange === range.value
                    ? 'font-medium text-espresso'
                    : 'text-warm-gray'
                }`}
              >
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-sand" />

      {/* Badges */}
      <div>
        <p className="mb-2.5 font-semibold font-ui text-[10px] text-espresso uppercase tracking-[0.2em]">
          Product Type
        </p>
        <div className="flex flex-col gap-2">
          {ALL_BADGES.map((badge) => {
            const checked = filters.badges.includes(badge);
            return (
              <label
                key={badge}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 hover:bg-cream"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    const next = checked
                      ? filters.badges.filter((b) => b !== badge)
                      : [...filters.badges, badge];
                    onChange({ ...filters, badges: next });
                  }}
                  className="h-3.5 w-3.5 accent-terracotta"
                />
                <span
                  className={`font-body text-sm transition-colors ${
                    checked ? 'font-medium text-espresso' : 'text-warm-gray'
                  }`}
                >
                  {badge}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {activeCount > 0 && (
        <>
          <div className="h-px bg-sand" />
          <button
            type="button"
            onClick={onReset}
            className="font-ui text-terracotta text-xs uppercase tracking-wider transition-colors hover:text-mocha"
          >
            Clear all filters ({activeCount})
          </button>
        </>
      )}
    </div>
  );
}

// ─── Sort Bar ─────────────────────────────────────────────────────────────────

function SortBar({
  sort,
  total,
  onSortChange,
  onOpenFilters,
}: {
  sort: SortOption;
  total: number;
  onSortChange: (v: SortOption) => void;
  onOpenFilters: () => void;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      {/* Left: count + mobile filter button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenFilters}
          className="flex items-center gap-2 rounded-lg border border-sand bg-cream px-3 py-2 font-ui text-[12px] text-espresso transition-colors hover:border-mocha lg:hidden"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          Filters
        </button>
        <p className="font-body text-sm text-warm-gray">
          <span className="font-medium text-espresso">{total}</span> products
        </p>
      </div>

      {/* Right: sort select */}
      <div className="relative">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="cursor-pointer appearance-none rounded-lg border border-sand bg-cream py-2 pr-8 pl-3.5 font-ui text-[12px] text-espresso transition-colors hover:border-mocha focus:outline-none focus:ring-2 focus:ring-terracotta/30"
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-warm-gray"
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
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

// ─── Active Filter Chips ──────────────────────────────────────────────────────

function ActiveFilterChips({
  filters,
  onChange,
  onReset,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}) {
  const chips: { label: string; onRemove: () => void }[] = [];

  if (filters.category !== 'all') {
    const cat = CATEGORIES.find((c) => c.slug === filters.category);
    chips.push({
      label: cat?.label ?? filters.category,
      onRemove: () => onChange({ ...filters, category: 'all' }),
    });
  }

  if (filters.priceRange !== 'all') {
    const range = PRICE_RANGES.find((r) => r.value === filters.priceRange);
    chips.push({
      label: range?.label ?? filters.priceRange,
      onRemove: () => onChange({ ...filters, priceRange: 'all' }),
    });
  }

  for (const badge of filters.badges) {
    chips.push({
      label: badge,
      onRemove: () =>
        onChange({
          ...filters,
          badges: filters.badges.filter((b) => b !== badge),
        }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={chip.label}
          className="flex items-center gap-1.5 rounded-full border border-sand bg-linen px-3 py-1 font-ui text-[11px] text-espresso"
        >
          {chip.label}
          <button
            type="button"
            onClick={chip.onRemove}
            aria-label={`Remove ${chip.label} filter`}
            className="ml-0.5 text-warm-gray transition-colors hover:text-terracotta"
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="font-ui text-[11px] text-warm-gray underline underline-offset-2 transition-colors hover:text-terracotta"
      >
        Clear all
      </button>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="mt-12 flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-sand text-warm-gray transition-all duration-200 hover:border-mocha hover:text-espresso disabled:pointer-events-none disabled:opacity-30"
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
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onChange(page)}
          aria-label={`Page ${page}`}
          aria-current={page === current ? 'page' : undefined}
          className={`flex h-9 w-9 items-center justify-center rounded-lg font-ui text-sm transition-all duration-200 ${
            page === current
              ? 'bg-terracotta text-cream shadow-sm'
              : 'border border-sand text-warm-gray hover:border-mocha hover:text-espresso'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-sand text-warm-gray transition-all duration-200 hover:border-mocha hover:text-espresso disabled:pointer-events-none disabled:opacity-30"
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
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-5" aria-hidden="true">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          role="img"
          aria-label="Empty state illustration"
        >
          <circle cx="28" cy="28" r="26" stroke="#E0D5C8" strokeWidth="1.5" />
          <path
            d="M18 24 Q28 18 38 24"
            stroke="#C1644F"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M16 32 Q28 26 40 32"
            stroke="#D4927A"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M18 40 Q28 34 38 40"
            stroke="#C1644F"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>
      <h3 className="mb-2 font-heading text-2xl text-espresso">No products found</h3>
      <p className="mb-6 max-w-xs font-body text-sm text-warm-gray leading-relaxed">
        We couldn&apos;t find anything matching your filters. Try adjusting them.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full bg-terracotta px-6 py-2.5 font-ui text-cream text-sm transition-colors hover:bg-mocha"
      >
        Clear all filters
      </button>
    </div>
  );
}

// ─── Trust Strip ──────────────────────────────────────────────────────────────

const trustItems = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: 'Handmade in Nepal',
    detail: 'Every piece crafted with care',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 4v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    label: 'Free Delivery',
    detail: 'On orders above रू 2,000',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
    label: 'Easy Returns',
    detail: '7-day hassle-free returns',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    label: 'Secure Checkout',
    detail: 'eSewa & bank cards accepted',
  },
];

function TrustStrip() {
  return (
    <div className="border-sand border-y bg-linen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 text-terracotta">{item.icon}</div>
              <div>
                <p className="font-semibold font-ui text-[12px] text-espresso">{item.label}</p>
                <p className="mt-0.5 font-body text-[11px] text-warm-gray">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Filter Drawer ─────────────────────────────────────────────────────

function MobileFilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onReset,
}: {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-espresso/40 backdrop-blur-sm dark:bg-black/60 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-linen p-6 pb-8 shadow-2xl lg:hidden"
          >
            {/* Handle */}
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-sand" aria-hidden="true" />

            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-heading text-espresso text-xl">Filters</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="p-1 text-warm-gray hover:text-espresso"
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

            <FilterPanel filters={filters} onChange={onChange} onReset={onReset} />

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-terracotta py-3.5 font-ui text-cream text-sm transition-colors hover:bg-mocha"
            >
              Show results
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleFilterChange = useCallback((next: FilterState) => {
    setFilters(next);
    setPage(1);
  }, []);

  const handleCategoryChange = useCallback(
    (slug: CategorySlug) => {
      handleFilterChange({ ...filters, category: slug });
    },
    [filters, handleFilterChange],
  );

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const filtered = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (filters.category !== 'all') {
      result = result.filter((p) => p.categorySlug === filters.category);
    }

    if (filters.priceRange !== 'all') {
      result = result.filter((p) => {
        switch (filters.priceRange) {
          case 'under-500':
            return p.price < 500;
          case '500-1500':
            return p.price >= 500 && p.price <= 1500;
          case '1500-3000':
            return p.price > 1500 && p.price <= 3000;
          case 'above-3000':
            return p.price > 3000;
          default:
            return true;
        }
      });
    }

    if (filters.badges.length > 0) {
      result = result.filter((p) => p.badge && filters.badges.includes(p.badge));
    }

    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [filters]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  const handlePageChange = useCallback((p: number) => {
    setPage(p);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <ShopHero
        activeCategory={filters.category}
        total={filtered.length}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main layout */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex gap-8 xl:gap-12">
          {/* Desktop filter sidebar */}
          <aside className="hidden w-60 shrink-0 lg:block xl:w-64">
            <div className="sticky top-20 rounded-2xl border border-sand bg-linen p-5">
              <div className="mb-4 flex items-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="text-terracotta"
                  aria-hidden="true"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                <h2 className="font-heading text-espresso text-lg">Filters</h2>
              </div>
              <FilterPanel filters={filters} onChange={handleFilterChange} onReset={handleReset} />
            </div>
          </aside>

          {/* Product area */}
          <div className="min-w-0 flex-1">
            <SortBar
              sort={filters.sort}
              total={filtered.length}
              onSortChange={(sort) => handleFilterChange({ ...filters, sort })}
              onOpenFilters={() => setMobileFiltersOpen(true)}
            />

            <ActiveFilterChips
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleReset}
            />

            {paginated.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${filters.category}-${filters.priceRange}-${filters.badges.join(',')}-${filters.sort}-p${page}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3"
                >
                  {paginated.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <EmptyState onReset={handleReset} />
            )}

            {totalPages > 1 && paginated.length > 0 && (
              <Pagination current={page} total={totalPages} onChange={handlePageChange} />
            )}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <TrustStrip />

      {/* Mobile filter drawer */}
      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
      />
    </div>
  );
}
