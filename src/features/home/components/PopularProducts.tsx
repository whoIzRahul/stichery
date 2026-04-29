'use client';
import { motion } from 'framer-motion';
import { FallbackImage as Image } from '@/components/common';
import { selectIsInWishlist, toggleWishlist } from '@/features/wishlist';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type Badge = 'Bestseller' | 'New' | 'Sale' | 'Limited';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: Badge;
};

const badgeStyles: Record<Badge, string> = {
  Bestseller: 'bg-amber text-espresso',
  New: 'bg-sage text-cream',
  Sale: 'bg-terracotta text-cream',
  Limited: 'bg-mocha text-cream',
};

const products: Product[] = [
  {
    id: '1',
    name: 'Himalayan Rose Bouquet',
    category: 'Crochet Flowers',
    price: 1299,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 156,
    image:
      'https://images.unsplash.com/photo-1700170447159-9d2d0da133a5?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
  },
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
];

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
      <span className="font-ui text-[11px] font-semibold text-espresso">{rating}</span>
      <span className="font-body text-[10px] text-warm-gray">({count})</span>
    </div>
  );
}

export function HeartIcon() {
  return (
    <svg
      width="18"
      height="18"
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

function BagIcon() {
  return (
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: 'easeOut' }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-cream shadow-[0_2px_12px_rgba(44,26,26,0.07)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(44,26,26,0.14)] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
    >
      {/* Image + overlays */}
      <div className="relative aspect-[4/5] overflow-hidden bg-linen">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Dark gradient for legibility of overlaid elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent" />

        {/* Badge — slightly tilted for artisan feel */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 -rotate-1 rounded-sm px-2.5 py-0.5 font-ui text-[10px] font-bold tracking-wider shadow-sm ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {/* Discount pill */}
        {discount && (
          <span className="absolute top-3 right-10 rounded-full bg-terracotta/90 px-2 py-0.5 font-ui text-[10px] font-bold text-cream shadow-sm">
            -{discount}%
          </span>
        )}

        {/* Wishlist — always faintly visible */}
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
            width="18"
            height="18"
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

        {/* Quick-add bar — slides up from bottom of image on hover */}
        <Link
          href={AppPaths.products.detail(product.id)}
          aria-label={`Add ${product.name} to cart`}
          className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-espresso/95 py-3 font-ui text-cream text-[11px] tracking-[0.1em] uppercase backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0 dark:bg-[#0e0904]/95 dark:[--color-cream:#faf7f2]"
        >
          <BagIcon />
          Add to Cart
        </Link>
      </div>

      {/* Info strip */}
      <div className="flex flex-col gap-1 px-3.5 pb-3.5 pt-3">
        <p className="font-ui text-[9px] font-semibold text-terracotta uppercase tracking-[0.18em]">
          {product.category}
        </p>
        <h3 className="font-heading text-[1.05rem] text-espresso leading-snug">{product.name}</h3>
        {/* Rating + price inline — non-standard layout */}
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

export function PopularProducts() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-2 font-ui text-terracotta text-xs uppercase tracking-widest"
            >
              Trending
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-heading text-4xl text-espresso lg:text-5xl"
            >
              Popular Right Now
            </motion.h2>
          </div>
          <Link
            href={AppPaths.products.list}
            className="hidden items-center gap-1.5 font-ui text-mocha text-sm transition-colors hover:text-terracotta sm:inline-flex"
          >
            View all
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Product Grid — 8 products */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Mobile view-all link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href={AppPaths.products.list}
            className="inline-flex items-center gap-2 font-ui text-mocha text-sm transition-colors hover:text-terracotta"
          >
            View all products
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
