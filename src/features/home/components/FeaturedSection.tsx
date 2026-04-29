'use client';
import { motion } from 'framer-motion';
import { FallbackImage as Image } from '@/components/common';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';

const extraFeatured = [
  {
    id: 'f2',
    name: 'Crochet Rose Arrangement',
    category: 'Flowers',
    price: 1099,
    rating: 4.8,
    reviewCount: 112,
    image:
      'https://images.unsplash.com/photo-1689999015707-7734e1962dd4?auto=format&fit=crop&w=600&q=80',
    badge: 'New Arrival',
  },
  {
    id: 'f3',
    name: 'Sunflower Key Ring Set',
    category: 'Key Rings',
    price: 699,
    originalPrice: 999,
    rating: 4.7,
    reviewCount: 88,
    image:
      'https://images.unsplash.com/photo-1716400128984-3681f2005d22?auto=format&fit=crop&w=600&q=80',
    badge: 'Sale',
  },
  {
    id: 'f4',
    name: 'Chunky Knit Woolen Scarf',
    category: 'Accessories',
    price: 1499,
    rating: 4.9,
    reviewCount: 54,
    image:
      'https://images.unsplash.com/photo-1560198598-8382ff5e7318?auto=format&fit=crop&w=600&q=80',
    badge: 'Staff Pick',
  },
];

export function FeaturedSection() {
  return (
    <section className="bg-linen py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero featured product */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl border border-sand bg-cream shadow-sm lg:grid-cols-2 lg:gap-16"
        >
          {/* Left: Large image */}
          <div className="relative aspect-4/5 min-h-100 overflow-hidden bg-linen lg:aspect-auto lg:h-full">
            <Image
              src="https://images.unsplash.com/photo-1554583826-08610bcb6c3a?auto=format&fit=crop&w=900&q=85"
              alt="Featured hand-knitted sweater"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-sand bg-cream/90 px-3 py-2 font-ui text-mocha text-xs backdrop-blur-sm">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
                Staff Pick of the Week
              </span>
            </div>
          </div>

          {/* Right: Product details */}
          <div className="flex flex-col gap-6 px-6 py-8 lg:px-10 lg:py-12">
            <p className="font-ui text-terracotta text-xs uppercase tracking-widest">Featured</p>

            <h2 className="font-heading text-4xl text-espresso leading-tight lg:text-5xl">
              Himalayan Hand-Knitted Sweater
            </h2>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#D4A447"
                    aria-hidden="true"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <span className="font-body text-sm text-warm-gray">4.9 · 143 reviews</span>
            </div>

            <p className="font-body text-warm-gray leading-relaxed">
              Handcrafted with pure Himalayan wool, this sweater brings the warmth of Nepal&apos;s
              mountain tradition to your wardrobe. Each stitch is made with care by skilled artisans
              — a forever piece for cold Kathmandu evenings.
            </p>

            <div className="flex flex-wrap gap-2">
              {['Pure Himalayan Wool', 'Handcrafted', 'Warm & Cosy', 'Gift Ready'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-sand bg-linen px-3 py-1 font-ui text-[11px] text-mocha"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-heading text-3xl text-espresso">रू 3,499</span>
              <span className="font-body text-lg text-warm-gray line-through">रू 4,299</span>
              <span className="rounded-full bg-terracotta px-2.5 py-0.5 font-ui text-cream text-sm">
                19% off
              </span>
            </div>

            <div className="mt-2 flex gap-3">
              <Link
                href={AppPaths.products.detail('himalayan-sweater')}
                className="flex-1 rounded-xl bg-terracotta py-3.5 text-center font-ui text-cream text-sm transition-colors duration-200 hover:bg-mocha"
              >
                Add to Cart
              </Link>
              <Link
                href={AppPaths.products.detail('himalayan-sweater')}
                className="flex-1 rounded-xl border-2 border-mocha py-3.5 text-center font-ui text-mocha text-sm transition-colors duration-200 hover:bg-mocha hover:text-cream"
              >
                View Details
              </Link>
            </div>

            <div className="flex items-center gap-4 border-sand border-t pt-4 text-warm-gray">
              <div className="flex items-center gap-1.5 font-body text-xs">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                Free Packaging
              </div>
              <div className="flex items-center gap-1.5 font-body text-xs">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Ships in 3–5 days
              </div>
              <div className="flex items-center gap-1.5 font-body text-xs">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </motion.div>

        {/* More Featured Picks */}
        <div className="mt-12">
          <div className="mb-7 flex items-end justify-between">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-heading text-2xl text-espresso lg:text-3xl"
            >
              More Featured Picks
            </motion.h3>
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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {extraFeatured.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-cream shadow-[0_2px_12px_rgba(44,26,26,0.07)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(44,26,26,0.14)] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
              >
                {/* Image + overlays */}
                <div className="relative aspect-4/3 overflow-hidden bg-linen">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent" />

                  {/* Badge — slightly tilted */}
                  <span className="-rotate-1 absolute top-3 left-3 rounded-sm bg-mocha px-2.5 py-0.5 font-ui text-[10px] font-bold tracking-wider text-cream shadow-sm">
                    {item.badge}
                  </span>

                  {/* Discount pill */}
                  {'originalPrice' in item && item.originalPrice && (
                    <span className="absolute top-3 right-3 rounded-full bg-terracotta/90 px-2 py-0.5 font-ui text-[10px] font-bold text-cream shadow-sm">
                      -
                      {Math.round(
                        ((((item as { originalPrice: number }).originalPrice as number) -
                          item.price) /
                          ((item as { originalPrice: number }).originalPrice as number)) *
                          100,
                      )}
                      %
                    </span>
                  )}

                  {/* Wishlist — always faintly visible */}
                  <button
                    type="button"
                    aria-label={`Save ${item.name} to wishlist`}
                    className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-cream/70 text-warm-gray opacity-60 backdrop-blur-sm transition-all duration-200 hover:bg-cream hover:text-terracotta hover:opacity-100 group-hover:opacity-100"
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
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  {/* Quick-add — slides up on hover */}
                  <Link
                    href={AppPaths.products.detail(item.id)}
                    aria-label={`Add ${item.name} to cart`}
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

                {/* Info strip */}
                <div className="flex flex-col gap-1 px-3.5 pb-3.5 pt-3">
                  <p className="font-ui text-[9px] font-semibold text-terracotta uppercase tracking-[0.18em]">
                    {item.category}
                  </p>
                  <h4 className="font-heading text-[1.05rem] text-espresso leading-snug">
                    {item.name}
                  </h4>
                  {/* Rating + price inline */}
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <div
                      className="flex items-center gap-1.5"
                      role="img"
                      aria-label={`${item.rating} out of 5, ${item.reviewCount} reviews`}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="#D4A447"
                        aria-hidden="true"
                      >
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                      <span className="font-ui text-[11px] font-semibold text-espresso">
                        {item.rating}
                      </span>
                      <span className="font-body text-[10px] text-warm-gray">
                        ({item.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-lg leading-none">
                        <span className="text-terracotta">रू</span>
                        <span className="text-espresso"> {item.price.toLocaleString('en-IN')}</span>
                      </span>
                      {'originalPrice' in item && item.originalPrice && (
                        <span className="font-body text-[10px] text-warm-gray line-through">
                          {(
                            (item as { originalPrice: number }).originalPrice as number
                          ).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
