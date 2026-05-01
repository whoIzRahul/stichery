'use client';
import { motion } from 'framer-motion';
import { FallbackImage as Image } from '@/components/common';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';

const marqueeItems = [
  'Crochet Flowers',
  'Key Rings & Charms',
  'Woolen Sweaters',
  'Accessories',
  'Yarn & Thread',
  'Custom Gifts',
];

function StatPill({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-heading text-2xl text-cream">{number}</span>
      <span className="font-body text-[10px] text-cream/50 uppercase tracking-widest">{label}</span>
    </div>
  );
}

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden bg-espresso dark:[--color-espresso:#2c1a1a] dark:[--color-cream:#faf7f2] dark:[--color-linen:#f2ebe0] dark:[--color-rose:#d4927a] dark:[--color-terracotta:#c1644f] dark:[--color-mocha:#8b5e52] dark:[--color-sand:#e0d5c8] dark:[--color-amber:#d4a447] dark:[--color-warm-gray:#9a8878] dark:[--color-sage:#a3b89a]"
      style={{ minHeight: '100svh' }}
    >
      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #faf7f2 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute top-1/3 left-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-terracotta/8 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 right-0 h-72 w-72 translate-x-1/3 -translate-y-1/4 rounded-full bg-rose/6 blur-[80px]"
        aria-hidden="true"
      />

      {/* Decorative rings */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full border-[40px] border-terracotta/8"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-6 -right-6 h-36 w-36 rounded-full border border-cream/10"
        aria-hidden="true"
      />

      {/* Main content grid */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:min-h-[calc(100svh-48px)] lg:grid-cols-[1fr_42%] lg:gap-16 lg:px-8 lg:py-0">
        {/* Left: Text */}
        <div className="flex flex-col gap-7 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/8 px-4 py-1.5 font-ui text-cream/70 text-xs tracking-wide">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
              Handmade &amp; Heartfelt — Made in Nepal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading leading-none tracking-tight"
          >
            <span className="block text-[3.5rem] text-cream sm:text-[5rem] lg:text-[6rem]">
              Crafted
            </span>
            <span className="block text-[3.5rem] text-sand sm:text-[5rem] lg:text-[6rem]">
              with <em className="text-terracotta not-italic">Love,</em>
            </span>
            <span className="block text-[2.4rem] text-cream/25 sm:text-[3.4rem] lg:text-[4.2rem]">
              Yarn by Yarn
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-md font-body text-cream/55 leading-relaxed lg:text-lg"
          >
            Discover exquisite handmade crochet creations from Nepal — delicate floral bouquets,
            cosy knit sweaters, and charming key rings. Every piece made with care, just for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href={AppPaths.products.list}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 font-ui text-cream text-sm shadow-lg shadow-terracotta/20 transition-all duration-200 hover:bg-rose hover:shadow-rose/20"
            >
              Shop Collection
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
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48 }}
            className="mt-2 flex items-center gap-8 border-cream/10 border-t pt-6"
          >
            <StatPill number="500+" label="Products" />
            <div className="h-8 w-px bg-cream/15" />
            <StatPill number="1200+" label="Customers" />
            <div className="h-8 w-px bg-cream/15" />
            <StatPill number="100%" label="Handmade" />
          </motion.div>
        </div>

        {/* Right: Hero image */}
        <div className="relative order-first lg:order-none lg:h-[78vh] lg:self-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative h-64 overflow-hidden rounded-3xl sm:h-80 lg:h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1670764732518-a4cec3b0dc09?auto=format&fit=crop&w=900&q=85"
              alt="Colorful handmade crochet flowers and yarn"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 42vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-espresso/50 via-transparent to-transparent" />
          </motion.div>

          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl border border-cream/15 bg-espresso/90 px-4 py-3 shadow-xl backdrop-blur-sm"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="#D4A447"
                  aria-hidden="true"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>
            <div>
              <p className="font-heading font-medium text-cream text-sm">4.9 / 5</p>
              <p className="font-body text-[10px] text-cream/50">from 800+ reviews</p>
            </div>
          </motion.div>

          {/* Handmade badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [0, 3, 0, 3, 0],
            }}
            transition={{
              opacity: { delay: 0.65, duration: 0.4 },
              scale: { delay: 0.65, duration: 0.4 },
              rotate: {
                delay: 1.2,
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              },
            }}
            className="absolute top-6 -right-3 rounded-full bg-terracotta px-3 py-1.5 font-ui text-cream text-xs shadow-md"
          >
            ✦ Handmade in Nepal
          </motion.div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="relative z-10 overflow-hidden border-cream/8 border-y py-3">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 30s linear infinite' }}
          aria-hidden="true"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static decorative marquee
              key={i}
              className="inline-flex items-center gap-4 px-8 font-ui text-cream/30 text-xs uppercase tracking-[0.2em]"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-terracotta/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
