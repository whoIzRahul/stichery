'use client';
import { motion } from 'framer-motion';
import { FallbackImage as Image } from '@/components/common';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';

function DecorativeDots() {
  return (
    <div
      className="pointer-events-none absolute -top-4 -right-4 grid grid-cols-4 gap-1.5 opacity-30"
      aria-hidden="true"
    >
      {Array.from({ length: 16 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: decorative static grid
        <div key={i} className="h-1.5 w-1.5 rounded-full bg-mocha" />
      ))}
    </div>
  );
}

function StatBadge({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-heading text-2xl text-espresso">{number}</span>
      <span className="font-body text-warm-gray text-xs uppercase tracking-wide">{label}</span>
    </div>
  );
}

export function HeroBanner() {
  return (
    <section className="overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: Text content */}
          <div className="order-2 flex flex-col gap-6 lg:order-1">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex w-fit items-center gap-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-rose/20 bg-rose/15 px-4 py-1.5 font-ui text-mocha text-xs tracking-wide">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-terracotta" />
                Handmade &amp; Heartfelt — Made in Nepal
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="font-heading text-[3.2rem] text-espresso leading-[1.05] tracking-tight sm:text-[4rem] lg:text-[4.8rem]"
            >
              Crafted with <em className="text-terracotta not-italic">Love,</em>
              <br />
              Yarn by Yarn
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
              className="max-w-md font-body text-base text-warm-gray leading-relaxed lg:text-lg"
            >
              Discover exquisite handmade crochet creations from Nepal — delicate floral bouquets,
              cosy knit sweaters, and charming key rings. Every piece made with care, just for you.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: 'easeOut' }}
              className="mt-2 flex flex-wrap items-center gap-3"
            >
              <Link
                href={AppPaths.products.list}
                className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 font-ui text-cream text-sm shadow-sm transition-colors duration-200 hover:bg-mocha"
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
              <Link
                href={`${AppPaths.products.list}?custom=true`}
                className="inline-flex items-center rounded-full border-2 border-mocha px-7 py-3.5 font-ui text-mocha text-sm transition-colors duration-200 hover:bg-mocha hover:text-cream"
              >
                Custom Orders
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44, ease: 'easeOut' }}
              className="mt-4 flex items-center gap-8 border-sand border-t pt-6"
            >
              <StatBadge number="500+" label="Products" />
              <div className="h-8 w-px bg-sand" />
              <StatBadge number="1200+" label="Customers" />
              <div className="h-8 w-px bg-sand" />
              <StatBadge number="100%" label="Handmade" />
            </motion.div>
          </div>

          {/* Right: Hero image */}
          <div className="relative order-1 lg:order-2">
            <DecorativeDots />

            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative aspect-4/5 overflow-hidden rounded-4xl bg-linen shadow-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1670764732518-a4cec3b0dc09?auto=format&fit=crop&w=900&q=85"
                alt="Colorful handmade crochet flowers and yarn"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-espresso/20 via-transparent to-transparent" />
            </motion.div>

            {/* Floating rating badge */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
              className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl border border-sand bg-cream px-4 py-3 shadow-lg"
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
                <p className="font-heading font-medium text-espresso text-sm">4.9 / 5</p>
                <p className="font-body text-[10px] text-warm-gray">from 800+ reviews</p>
              </div>
            </motion.div>

            {/* Floating handmade badge */}
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
      </div>

      {/* Bottom wave divider */}
      <div
        className="mt-2 h-6 bg-linen"
        style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}
        aria-hidden="true"
      />
    </section>
  );
}
