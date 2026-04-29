'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FallbackImage as Image } from '@/components/common';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';

const categories = [
  {
    id: '1',
    name: 'Crochet Flowers',
    slug: 'flowers',
    count: 48,
    image:
      'https://images.unsplash.com/photo-1689999015579-aaeaba5ebf69?auto=format&fit=crop&w=1400&q=85',
    tagline: 'Blooms that last forever',
  },
  {
    id: '2',
    name: 'Key Rings & Charms',
    slug: 'key-rings',
    count: 65,
    image:
      'https://images.unsplash.com/photo-1716400128984-3681f2005d22?auto=format&fit=crop&w=1400&q=85',
    tagline: 'Carry a piece of handmade art',
  },
  {
    id: '3',
    name: 'Hand-Knitted Sweaters',
    slug: 'sweaters',
    count: 23,
    image:
      'https://images.unsplash.com/photo-1610177364662-c2f836b710ee?auto=format&fit=crop&w=1400&q=85',
    tagline: 'Warmth woven with love',
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    count: 41,
    image:
      'https://images.unsplash.com/photo-1753370474663-1b0ad622c5fc?auto=format&fit=crop&w=1400&q=85',
    tagline: 'Handcrafted details that shine',
  },
  {
    id: '5',
    name: 'Yarn & Thread',
    slug: 'yarn',
    count: 19,
    image:
      'https://images.unsplash.com/photo-1576376262099-6ec3ed655f52?auto=format&fit=crop&w=1400&q=85',
    tagline: 'Start your own creation',
  },
  {
    id: '6',
    name: 'Custom Gifts',
    slug: 'custom',
    count: 12,
    image:
      'https://images.unsplash.com/photo-1739251203774-033c5a46851a?auto=format&fit=crop&w=1400&q=85',
    tagline: 'Made just for you, with love',
  },
] as const;

type Category = (typeof categories)[number];

const fadeVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
};

const textVariants = {
  enter: { opacity: 0, y: 32 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const numVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export function CategoriesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % categories.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + categories.length) % categories.length);
  }, []);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setIsDragging(false);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 8) setIsDragging(true);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (dragStartX.current === null) return;
      const delta = e.clientX - dragStartX.current;
      if (Math.abs(delta) > 50) {
        if (delta < 0) next();
        else prev();
      }
      dragStartX.current = null;
      setIsDragging(false);
    },
    [next, prev],
  );

  const handlePointerLeave = useCallback(() => {
    dragStartX.current = null;
    setIsDragging(false);
  }, []);

  const cat: Category = categories[active];
  const idx0 = String(active + 1).padStart(2, '0');

  return (
    <section>
      {/* Section header */}
      <div className="bg-linen px-4 pb-8 pt-16 text-center sm:px-6 lg:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-2 font-ui text-xs text-terracotta uppercase tracking-widest"
        >
          Collections
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-4xl text-espresso lg:text-5xl"
        >
          Browse by Category
        </motion.h2>
      </div>

      {/* Cinematic carousel */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: carousel viewport drag-to-navigate via pointer events, pauses on hover */}
      <div
        className={`relative overflow-hidden bg-espresso select-none dark:bg-[#100b05] dark:[--color-cream:#faf7f2] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ height: '68vh', minHeight: 420 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          handlePointerLeave();
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        {/* Cross-fade + scale backgrounds with Ken Burns */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${active}`}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{ animation: 'kenburns 8s ease-out forwards' }}
            />
            {/* Rich gradient: dark left column + bottom pool */}
            <div className="absolute inset-0 bg-linear-to-r from-espresso/90 via-espresso/40 to-transparent dark:from-linen/90 dark:via-linen/70" />
            <div className="absolute inset-0 bg-linear-to-t from-espresso/70 via-transparent to-transparent dark:from-linen/50" />
          </motion.div>
        </AnimatePresence>

        {/* Left content panel */}
        <div className="relative z-10 flex h-full flex-col justify-center px-8 lg:px-16">
          {/* Decorative large slide number */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`num-${active}`}
              variants={numVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="mb-1 font-heading text-[7rem] font-bold text-cream/8 leading-none select-none lg:text-[10rem]"
              aria-hidden="true"
            >
              {idx0}
            </motion.div>
          </AnimatePresence>

          {/* Vertical accent + text */}
          <div className="flex items-start gap-5">
            <div className="mt-1 h-20 w-[2px] shrink-0 bg-terracotta" aria-hidden="true" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${active}`}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
              >
                <p className="mb-1.5 font-body text-sm text-cream/55 italic">{cat.tagline}</p>
                <h3 className="font-heading text-4xl text-cream leading-tight lg:text-6xl">
                  {cat.name}
                </h3>
                <p className="mt-2 font-ui text-xs text-cream/40 uppercase tracking-[0.15em]">
                  {cat.count} handmade items
                </p>
                <Link
                  href={AppPaths.products.category(cat.slug)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="mt-6 inline-flex items-center gap-2.5 border-b border-cream/30 pb-0.5 font-ui text-cream text-sm tracking-wider transition-all duration-200 hover:border-cream hover:gap-4"
                >
                  Explore Collection
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Top-right: slide counter */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2" aria-live="polite">
          <span className="font-heading text-xl text-cream leading-none">{idx0}</span>
          <span className="font-body text-cream/30 text-xs">
            / {String(categories.length).padStart(2, '0')}
          </span>
        </div>

        {/* Auto-advance progress line */}
        {!paused && (
          <motion.div
            key={`progress-${active}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 5, ease: 'linear' }}
            style={{ originX: 0 }}
            className="absolute bottom-0 left-0 z-20 h-[2px] w-full bg-terracotta/80"
          />
        )}

        {/* Prev / Next arrows */}
        <button
          type="button"
          aria-label="Previous category"
          onClick={prev}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute bottom-8 right-20 z-20 flex h-10 w-10 cursor-pointer items-center justify-center border border-cream/20 bg-cream/8 text-cream backdrop-blur-sm transition-all duration-200 hover:border-cream/50 hover:bg-cream/20 lg:bottom-10 lg:right-24"
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
          aria-label="Next category"
          onClick={next}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute bottom-8 right-8 z-20 flex h-10 w-10 cursor-pointer items-center justify-center border border-cream/20 bg-cream/8 text-cream backdrop-blur-sm transition-all duration-200 hover:border-cream/50 hover:bg-cream/20 lg:bottom-10 lg:right-10"
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

      {/* Image thumbnail strip */}
      <div className="overflow-x-auto bg-espresso py-3 dark:bg-linen [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-center gap-2 px-4 sm:min-w-0 sm:justify-center sm:gap-3">
          {categories.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to ${c.name}`}
              className={`group relative shrink-0 overflow-hidden rounded-md transition-all duration-300 ${
                idx === active
                  ? 'ring-3 ring-amber ring-offset-2 ring-offset-espresso'
                  : 'opacity-40 hover:opacity-75 ring-2 ring-sand ring-offset-1 ring-offset-sand dark:ring-amber'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
