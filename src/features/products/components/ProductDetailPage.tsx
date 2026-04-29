'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FallbackImage as Image } from '@/components/common';
import { addItem } from '@/features/cart';
import { selectIsInWishlist, toggleWishlist } from '@/features/wishlist';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// ─── Types ────────────────────────────────────────────────────────────────────

type Badge = 'Bestseller' | 'New' | 'Sale' | 'Limited' | 'Staff Pick';

type Review = {
  id: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
};

type SimilarProduct = {
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

type ColorOption = { name: string; hex: string };

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1700170447159-9d2d0da133a5?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1682954013913-25fe41e180c0?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1689999015707-7734e1962dd4?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1689999015579-aaeaba5ebf69?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1602773974733-b56200c8653f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1671212684942-5c8a3dc3234e?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1716400128984-3681f2005d22?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1753366556705-1f657d2fa4db?auto=format&fit=crop&w=900&q=85',
];

const COLOR_OPTIONS: ColorOption[] = [
  { name: 'Classic Red', hex: '#C1644F' },
  { name: 'Dusty Rose', hex: '#D4927A' },
  { name: 'Soft Sage', hex: '#A3B89A' },
  { name: 'Warm Ivory', hex: '#F2EBE0' },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sunita Rai',
    initials: 'SR',
    rating: 5,
    date: '12 Apr 2025',
    title: 'Absolutely stunning, exceeded expectations!',
    body: 'I ordered this as a gift for my mother and she was completely delighted. The flowers look incredibly real and the craftsmanship is exceptional. Every petal is perfectly shaped. Will definitely order again!',
    verified: true,
    helpful: 34,
  },
  {
    id: '2',
    author: 'Priya Sharma',
    initials: 'PS',
    rating: 5,
    date: '3 Mar 2025',
    title: 'Perfect anniversary gift from Kathmandu',
    body: 'Brought this for our anniversary and my partner loved it. The rose colours are so vibrant and the whole bouquet looks luxurious. Packaging was also beautiful.',
    verified: true,
    helpful: 21,
  },
  {
    id: '3',
    author: 'Aditya Thapa',
    initials: 'AT',
    rating: 4,
    date: '19 Feb 2025',
    title: 'Great quality, minor colour difference',
    body: 'The bouquet is beautiful and well-made. Only slight note: the red roses looked slightly more orange than in the photos. But overall very happy with the purchase and delivery was fast.',
    verified: false,
    helpful: 8,
  },
  {
    id: '4',
    author: 'Meera Poudel',
    initials: 'MP',
    rating: 5,
    date: '5 Jan 2025',
    title: 'Handmade quality is unmatched',
    body: 'You can feel the love in every stitch. I have compared this to other crochet bouquets online and this is by far the most detailed and well-crafted. Worth every paisa.',
    verified: true,
    helpful: 45,
  },
];

const SIMILAR_PRODUCTS: SimilarProduct[] = [
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
  {
    id: '12',
    name: 'Peony Crochet Bouquet',
    category: 'Crochet Flowers',
    price: 1599,
    rating: 4.8,
    reviewCount: 76,
    image:
      'https://images.unsplash.com/photo-1689999015579-aaeaba5ebf69?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '17',
    name: 'Dried Flower Wall Wreath',
    category: 'Crochet Flowers',
    price: 2199,
    rating: 4.9,
    reviewCount: 62,
    image:
      'https://images.unsplash.com/photo-1700170447159-9d2d0da133a5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '20',
    name: 'Crochet Tulip Bouquet',
    category: 'Crochet Flowers',
    price: 899,
    originalPrice: 1099,
    rating: 4.7,
    reviewCount: 138,
    image:
      'https://images.unsplash.com/photo-1682954013913-25fe41e180c0?auto=format&fit=crop&w=600&q=80',
    badge: 'Sale',
  },
];

const BADGE_STYLES: Record<Badge, string> = {
  Bestseller: 'bg-amber text-espresso',
  New: 'bg-sage text-cream',
  Sale: 'bg-terracotta text-cream',
  Limited: 'bg-mocha text-cream',
  'Staff Pick': 'bg-rose text-espresso',
};

const RATING_BREAKDOWN: Record<1 | 2 | 3 | 4 | 5, number> = {
  5: 128,
  4: 20,
  3: 5,
  2: 2,
  1: 1,
};

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({
  rating,
  size = 14,
  interactive = false,
  onChange,
}: {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-0.5" role={interactive ? 'radiogroup' : 'img'}>
      {[1, 2, 3, 4, 5].map((star) => {
        const active = interactive ? hovered || rating : rating;
        const filled = active >= star;
        const half = !interactive && !filled && rating >= star - 0.5;
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            aria-label={interactive ? `Rate ${star} star${star !== 1 ? 's' : ''}` : undefined}
            className={
              interactive ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'
            }
          >
            <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
              {half ? (
                <>
                  <defs>
                    <linearGradient id={`h-${star}`} x1="0" x2="1" y1="0" y2="0">
                      <stop offset="50%" stopColor="#D4A447" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                    fill={`url(#h-${star})`}
                    stroke="#D4A447"
                    strokeWidth="1.5"
                  />
                </>
              ) : (
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill={filled ? '#D4A447' : 'none'}
                  stroke="#D4A447"
                  strokeWidth="1.5"
                />
              )}
            </svg>
          </button>
        );
      })}
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [prev, next, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/65 backdrop-blur-md dark:bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions: stops click-through on inner content */}
      <div
        className="relative flex w-full max-w-4xl flex-col items-center gap-4 px-4 py-16"
        onKeyPress={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="absolute top-5 inset-x-4 flex items-center justify-between">
          <span className="font-ui text-cream/60 text-sm">
            {current + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all hover:border-cream/50 hover:text-cream"
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

        {/* Main image with prev/next */}
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-xl"
            >
              <Image
                src={images[current]}
                alt={`Product photo ${current + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next overlays */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-espresso/60 text-cream/80 backdrop-blur-sm transition-all hover:border-cream/50 hover:bg-espresso/80 hover:text-cream dark:[--color-cream:#faf7f2] dark:bg-black/50 dark:hover:bg-black/70"
          >
            <svg
              width="16"
              height="16"
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
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-espresso/60 text-cream/80 backdrop-blur-sm transition-all hover:border-cream/50 hover:bg-espresso/80 hover:text-cream"
          >
            <svg
              width="16"
              height="16"
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

        {/* Thumbnail strip */}
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                i === current
                  ? 'ring-2 ring-rose ring-offset-2 ring-offset-espresso'
                  : 'opacity-45 hover:opacity-75'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="48px" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Image Gallery ────────────────────────────────────────────────────────────

function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);

  const VISIBLE = 4;

  const openLightbox = (index: number) => {
    setLightboxStart(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* Thumbnail column */}
        <div className="flex gap-2 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.slice(0, VISIBLE).map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 lg:h-20 lg:w-20 ${
                i === active
                  ? 'border-terracotta shadow-sm'
                  : 'border-transparent opacity-55 hover:opacity-90'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}

          {images.length > VISIBLE && (
            <button
              type="button"
              onClick={() => openLightbox(VISIBLE)}
              aria-label={`View ${images.length - VISIBLE} more photos`}
              className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 border-dashed border-sand transition-all hover:border-mocha lg:h-20 lg:w-20"
            >
              <Image
                src={images[VISIBLE]}
                alt=""
                fill
                className="object-cover opacity-35"
                sizes="80px"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <span className="font-heading text-espresso text-xl leading-none">
                  +{images.length - VISIBLE}
                </span>
                <span className="font-ui text-[9px] text-warm-gray uppercase tracking-wider">
                  more
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Main image */}
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-linen">
          <AnimatePresence mode="wait">
            <motion.button
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              type="button"
              onClick={() => openLightbox(active)}
              aria-label="View full-size image"
              className="group relative block aspect-[4/5] w-full overflow-hidden sm:aspect-square"
            >
              <Image
                src={images[active]}
                alt="Product photo"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 rounded-full bg-espresso/80 px-3 py-1.5 font-ui text-[11px] text-cream backdrop-blur-sm dark:bg-black/70 dark:[--color-cream:#faf7f2]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  View all {images.length} photos
                </span>
              </div>
            </motion.button>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            startIndex={lightboxStart}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-sand">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-semibold font-ui text-[11px] text-espresso uppercase tracking-[0.16em]">
          {title}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-warm-gray"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 font-body text-sm text-warm-gray leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Rating Bar ───────────────────────────────────────────────────────────────

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-3 shrink-0 font-ui text-[11px] text-warm-gray text-right">{stars}</span>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#D4A447" aria-hidden="true">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="h-full rounded-full bg-amber"
        />
      </div>
      <span className="w-6 shrink-0 font-ui text-[11px] text-warm-gray">{count}</span>
    </div>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  return (
    <div className="border-b border-sand py-6 last:border-0">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mocha/15 font-semibold font-ui text-[12px] text-mocha">
          {review.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold font-ui text-sm text-espresso">{review.author}</span>
            {review.verified && (
              <span className="flex items-center gap-0.5 rounded-full bg-sage/20 px-1.5 py-0.5 font-ui text-[9px] text-sage">
                <svg
                  width="8"
                  height="8"
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
                Verified
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <StarRating rating={review.rating} size={11} />
            <span className="font-body text-[11px] text-warm-gray">{review.date}</span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h4 className="mb-1 font-heading text-[1rem] text-espresso leading-snug">{review.title}</h4>
        <p className="font-body text-sm text-warm-gray leading-relaxed">{review.body}</p>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="font-body text-[11px] text-warm-gray">Helpful?</span>
        <button
          type="button"
          onClick={() => {
            if (!voted) {
              setHelpfulCount((h) => h + 1);
              setVoted(true);
            }
          }}
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-ui text-[11px] transition-all duration-200 ${
            voted
              ? 'border-sage/40 bg-sage/10 text-sage'
              : 'border-sand text-warm-gray hover:border-mocha hover:text-espresso'
          }`}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          {helpfulCount}
        </button>
      </div>
    </div>
  );
}

// ─── Similar Product Card ─────────────────────────────────────────────────────

function SimilarProductCard({ product, index }: { product: SimilarProduct; index: number }) {
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id));
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      className="group relative flex w-52 shrink-0 flex-col overflow-hidden rounded-xl bg-cream shadow-[0_2px_12px_rgba(44,26,26,0.07)] transition-shadow duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-300 after:ease-out hover:shadow-[0_8px_32px_rgba(44,26,26,0.14)] hover:after:scale-x-100"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-linen">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          sizes="208px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent" />

        {product.badge && (
          <span
            className={`absolute top-3 left-3 -rotate-1 rounded-sm px-2.5 py-0.5 font-bold font-ui text-[10px] tracking-wider shadow-sm ${BADGE_STYLES[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {discount && (
          <span className="absolute top-3 right-8 rounded-full bg-terracotta/90 px-2 py-0.5 font-bold font-ui text-[10px] text-cream shadow-sm">
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
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          View Product
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-1 px-3.5 pt-3 pb-3.5">
        <p className="font-semibold font-ui text-[9px] text-terracotta uppercase tracking-[0.18em]">
          {product.category}
        </p>
        <h4 className="line-clamp-2 font-heading text-[1.02rem] text-espresso leading-snug">
          {product.name}
        </h4>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#D4A447" aria-hidden="true">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <span className="font-semibold font-ui text-[11px] text-espresso">
              {product.rating}
            </span>
            <span className="font-body text-[10px] text-warm-gray">({product.reviewCount})</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-[1.05rem] leading-none">
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

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProductDetailPage() {
  const dispatch = useAppDispatch();
  const inWishlist = useAppSelector(selectIsInWishlist('1'));
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].name);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const AVG_RATING = 4.9;
  const TOTAL_REVIEWS = 156;

  const handleAddToCart = () => {
    const colorOption = COLOR_OPTIONS.find((c) => c.name === selectedColor);
    dispatch(
      addItem({
        id: '1',
        name: 'Himalayan Rose Bouquet',
        category: 'Crochet Flowers',
        price: 1299,
        originalPrice: 1699,
        quantity,
        color: selectedColor,
        colorHex: colorOption?.hex,
        image: PRODUCT_IMAGES[0],
      }),
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="border-b border-sand bg-linen">
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
          <nav
            className="flex flex-wrap items-center gap-2 font-ui text-[11px] text-warm-gray uppercase tracking-widest"
            aria-label="Breadcrumb"
          >
            <Link href={AppPaths.home} className="transition-colors hover:text-terracotta">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={AppPaths.products.list} className="transition-colors hover:text-terracotta">
              Shop
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={AppPaths.products.category('flowers')}
              className="transition-colors hover:text-terracotta"
            >
              Flowers
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-espresso">Himalayan Rose Bouquet</span>
          </nav>
        </div>
      </div>

      {/* Product main section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <ImageGallery images={PRODUCT_IMAGES} />
          </motion.div>

          {/* ── Info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
            className="flex flex-col"
          >
            {/* Badge + category */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="-rotate-1 rounded-sm bg-amber px-2.5 py-0.5 font-bold font-ui text-[10px] text-espresso tracking-wider shadow-sm">
                Bestseller
              </span>
              <span className="font-ui text-[11px] text-terracotta uppercase tracking-[0.16em]">
                Crochet Flowers
              </span>
            </div>

            {/* Name */}
            <h1 className="font-heading text-[2.1rem] text-espresso leading-tight tracking-tight sm:text-[2.6rem]">
              Himalayan Rose Bouquet
            </h1>

            {/* Rating + stock */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <StarRating rating={AVG_RATING} size={16} />
              <button
                type="button"
                onClick={scrollToReviews}
                className="font-body text-sm text-warm-gray underline underline-offset-2 transition-colors hover:text-terracotta"
              >
                {TOTAL_REVIEWS} reviews
              </button>
              <span className="h-4 w-px bg-sand" aria-hidden="true" />
              <span className="flex items-center gap-1 font-ui text-[11px] text-sage">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                In stock
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-heading text-[1.9rem] leading-none">
                <span className="text-terracotta">रू</span>
                <span className="text-espresso"> 1,299</span>
              </span>
              <span className="font-body text-base text-warm-gray line-through">1,699</span>
              <span className="rounded-full bg-terracotta/12 px-2.5 py-0.5 font-semibold font-ui text-xs text-terracotta">
                Save 24%
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 font-body text-sm text-warm-gray leading-relaxed">
              Handcrafted with love by artisans in Kathmandu Valley, this bouquet features twelve
              full-bloom roses in your choice of colour — each petal individually shaped and
              finished to perfection. Unlike fresh flowers, these bloom forever and require no care.
            </p>

            <div className="my-5 h-px bg-sand" />

            {/* Colour selection */}
            <div className="mb-5">
              <p className="mb-2.5 font-semibold font-ui text-[11px] text-espresso uppercase tracking-[0.16em]">
                Colour:{' '}
                <span className="font-normal normal-case tracking-normal text-warm-gray">
                  {selectedColor}
                </span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {COLOR_OPTIONS.map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setSelectedColor(col.name)}
                    aria-label={col.name}
                    title={col.name}
                    style={{ backgroundColor: col.hex }}
                    className={`relative h-8 w-8 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === col.name
                        ? 'scale-110 border-espresso shadow-md'
                        : 'border-transparent hover:scale-105 hover:border-warm-gray/40'
                    }`}
                  >
                    {selectedColor === col.name && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={col.hex === '#F2EBE0' ? '#2c1a1a' : '#fff'}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + CTA row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Quantity stepper */}
              <div className="flex items-center overflow-hidden rounded-xl border border-sand">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-12 w-12 items-center justify-center text-warm-gray transition-colors hover:bg-linen hover:text-espresso"
                >
                  <svg
                    width="14"
                    height="14"
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
                <span className="flex h-12 w-12 items-center justify-center border-x border-sand font-semibold font-ui text-sm text-espresso">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="flex h-12 w-12 items-center justify-center text-warm-gray transition-colors hover:bg-linen hover:text-espresso"
                >
                  <svg
                    width="14"
                    height="14"
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

              {/* Add to cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="relative flex h-12 min-w-[180px] flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-espresso font-ui text-cream text-sm uppercase tracking-[0.1em] transition-colors duration-300 hover:bg-mocha dark:bg-terracotta dark:hover:bg-mocha dark:[--color-cream:#faf7f2]"
              >
                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.span
                      key="done"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <svg
                        width="14"
                        height="14"
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
                      Added to Cart
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
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
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Wishlist toggle */}
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    toggleWishlist({
                      id: '1',
                      name: 'Himalayan Rose Bouquet',
                      category: 'Crochet Flowers',
                      price: 1299,
                      originalPrice: 1699,
                      rating: 4.9,
                      reviewCount: 156,
                      image: PRODUCT_IMAGES[0],
                      badge: 'Bestseller',
                      addedAt: new Date().toISOString(),
                    }),
                  )
                }
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-sand transition-all duration-200 hover:border-terracotta hover:bg-linen"
              >
                <motion.svg
                  animate={{ scale: inWishlist ? [1, 1.35, 1] : 1 }}
                  transition={{ duration: 0.28 }}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={inWishlist ? '#C1644F' : 'none'}
                  stroke={inWishlist ? '#C1644F' : 'currentColor'}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-warm-gray"
                  aria-hidden="true"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </motion.svg>
              </button>
            </div>

            {/* Trust micro-badges */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {['Free delivery above रू 2,000', '7-day easy returns', 'Secure eSewa checkout'].map(
                (label) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 font-body text-[11px] text-warm-gray"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-sage"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {label}
                  </span>
                ),
              )}
            </div>

            <div className="my-5 h-px bg-sand" />

            {/* Product detail accordions */}
            <div>
              <Accordion title="Materials & Craftsmanship" defaultOpen>
                <ul className="mt-1 space-y-1.5 pl-0">
                  <li>100% premium acrylic yarn — soft, durable, and colourfast</li>
                  <li>Wooden stem wires covered with green floral tape</li>
                  <li>Approximate bouquet height: 35–40 cm</li>
                  <li>Each piece is uniquely handmade — minor variations are a feature</li>
                </ul>
              </Accordion>
              <Accordion title="Care Instructions">
                <ul className="mt-1 space-y-1.5">
                  <li>Dust gently with a soft dry cloth or brush</li>
                  <li>Keep away from prolonged direct sunlight to preserve colour</li>
                  <li>Do not wash with water — spot clean only if needed</li>
                  <li>Store upright in a vase or lay flat in a gift box</li>
                </ul>
              </Accordion>
              <Accordion title="Shipping & Delivery">
                <ul className="mt-1 space-y-1.5">
                  <li>Kathmandu Valley: 1–2 business days</li>
                  <li>Other Nepal cities: 3–5 business days</li>
                  <li>Free delivery on orders above रू 2,000</li>
                  <li>Packaged in a signature gift box with tissue paper</li>
                </ul>
              </Accordion>
              <Accordion title="Gift Options">
                <p>
                  Add a personalised gift message at checkout — free of charge. Gift wrapping
                  available for रू 150.
                </p>
              </Accordion>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Similar Products ── */}
      <section className="border-t border-sand bg-linen">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-semibold font-ui text-[10px] text-terracotta uppercase tracking-[0.2em]">
                You may also like
              </p>
              <h2 className="mt-1 font-heading text-[2rem] text-espresso leading-tight">
                Similar Products
              </h2>
            </div>
            <Link
              href={AppPaths.products.category('flowers')}
              className="hidden shrink-0 font-ui text-[11px] text-warm-gray uppercase tracking-[0.14em] underline underline-offset-2 transition-colors hover:text-terracotta sm:block"
            >
              View all flowers →
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SIMILAR_PRODUCTS.map((product, i) => (
              <SimilarProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section
        ref={reviewsRef}
        className="border-t border-sand bg-cream"
        aria-label="Customer reviews"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="font-semibold font-ui text-[10px] text-terracotta uppercase tracking-[0.2em]">
              What customers say
            </p>
            <h2 className="mt-1 font-heading text-[2rem] text-espresso leading-tight">Reviews</h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
            {/* Rating summary sidebar */}
            <div>
              <div className="mb-6 flex items-end gap-4">
                <span className="font-heading text-[3.8rem] text-espresso leading-none">
                  {AVG_RATING}
                </span>
                <div className="pb-1.5">
                  <StarRating rating={AVG_RATING} size={18} />
                  <p className="mt-1 font-body text-sm text-warm-gray">
                    Based on {TOTAL_REVIEWS} reviews
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {([5, 4, 3, 2, 1] as const).map((star) => (
                  <RatingBar
                    key={star}
                    stars={star}
                    count={RATING_BREAKDOWN[star]}
                    total={TOTAL_REVIEWS}
                  />
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-linen p-4">
                <p className="font-body text-[12px] text-warm-gray leading-relaxed">
                  <strong className="text-espresso">97%</strong> of reviewers would recommend this
                  product to a friend.
                </p>
              </div>
            </div>

            {/* Reviews list */}
            <div>
              {MOCK_REVIEWS.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}

              {/* Login prompt for writing reviews */}
              <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-sand bg-linen px-6 py-5">
                <p className="font-heading text-espresso text-lg">Share your experience</p>
                <p className="font-body text-sm text-warm-gray">
                  Purchase this product and log in to leave a review.
                </p>
                <Link
                  href={AppPaths.auth.login}
                  className="rounded-xl bg-terracotta px-6 py-2.5 font-ui text-cream text-sm uppercase tracking-[0.1em] transition-colors hover:bg-mocha"
                >
                  Log in to review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
