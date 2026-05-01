'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { BlogPost, Category } from '../data';
import { CAT_META, formatDate, formatViews, POSTS } from '../data';

type SortKey = 'newest' | 'oldest' | 'popular';

type CategoryFilter = Category | 'all';

const PAGE_SIZE = 6;

/* ─── Image with fallback ─────────────────────────────────────────────────── */
function BlogImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-linen ${className ?? ''}`}>
        <div className="flex flex-col items-center gap-2 opacity-25">
          <svg viewBox="0 0 240 240" width="52" height="52" aria-hidden="true">
            <g
              fill="none"
              stroke="#2C1A1A"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse cx="80" cy="70" rx="34" ry="22" transform="rotate(-22 80 70)" />
              <ellipse cx="120" cy="120" rx="34" ry="22" />
              <ellipse cx="160" cy="170" rx="34" ry="22" transform="rotate(-22 160 170)" />
            </g>
            <circle cx="190" cy="190" r="9" fill="#D4927A" />
          </svg>
          <span className="font-ui text-[10px] text-espresso uppercase tracking-[0.15em]">
            Stitchery
          </span>
        </div>
      </div>
    );
  }

  return (
    // biome-ignore lint/performance/noImgElement: external image, not local asset
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  );
}

/* ─── Featured section — editorial magazine layout ────────────────────────── */
function FeaturedSection({ posts }: { posts: BlogPost[] }) {
  const [primary, secondary] = posts;
  if (!primary) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-[3fr_2fr] lg:gap-5">
      {/* ── Primary card ─────────────────────────────────────────── */}
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="group relative min-h-[420px] overflow-hidden rounded-3xl sm:min-h-[480px]"
      >
        {/* Full-bleed image */}
        <BlogImage
          src={primary.image}
          alt={primary.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-espresso/90 via-espresso/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-espresso/20 to-transparent" />

        {/* Decorative number watermark */}
        <span
          className="pointer-events-none absolute -top-4 right-4 select-none font-heading text-[160px] font-black leading-none text-white/[0.06] sm:text-[200px]"
          aria-hidden="true"
        >
          01
        </span>

        {/* Vertical "FEATURED" label */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 -rotate-90 select-none"
          aria-hidden="true"
        >
          <span className="font-ui text-[9px] text-white/25 uppercase tracking-[0.4em]">
            Featured
          </span>
        </div>

        {/* Left accent bar */}
        <div
          className="absolute top-6 bottom-6 left-0 w-0.5 bg-terracotta/60 rounded-full"
          aria-hidden="true"
        />

        {/* Content anchored to bottom */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          {/* Category + read time */}
          <div className="mb-3 flex items-center gap-3">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md ${CAT_META[primary.category].bg} ${CAT_META[primary.category].color}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${CAT_META[primary.category].dot}`}
                aria-hidden="true"
              />
              {CAT_META[primary.category].label}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 font-ui text-[10px] text-white/70 backdrop-blur-sm">
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {primary.readTime} min
            </span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-2xl font-bold text-cream leading-tight sm:text-3xl">
            {primary.title}
          </h2>

          {/* Excerpt */}
          <p className="mt-2 line-clamp-2 font-body text-[13px] text-cream/65 leading-relaxed sm:text-sm">
            {primary.excerpt}
          </p>

          {/* Meta + CTA */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-terracotta font-heading text-[11px] font-bold text-cream">
                {primary.author.charAt(0)}
              </div>
              <div>
                <p className="font-ui text-[11px] font-semibold text-cream/90">{primary.author}</p>
                <p className="font-ui text-[10px] text-cream/50">{formatDate(primary.date)}</p>
              </div>
            </div>
            <a
              href={`/blog/${primary.slug}`}
              className="flex items-center gap-2 rounded-xl bg-cream/15 px-4 py-2 font-ui text-[12px] font-semibold text-cream backdrop-blur-sm transition-all duration-200 hover:bg-terracotta hover:text-cream"
            >
              Read Article
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </motion.article>

      {/* ── Secondary card ────────────────────────────────────────── */}
      {secondary && (
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="group flex flex-col overflow-hidden rounded-3xl border border-sand/50 bg-white dark:border-sand/20 dark:bg-sand/5"
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden sm:h-64 lg:h-auto lg:flex-1">
            <BlogImage
              src={secondary.image}
              alt={secondary.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-espresso/40 to-transparent" />

            {/* Decorative number watermark */}
            <span
              className="pointer-events-none absolute -top-2 right-3 select-none font-heading text-[100px] font-black leading-none text-white/10"
              aria-hidden="true"
            >
              02
            </span>

            {/* Category */}
            <span
              className={`absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-ui text-[10px] font-semibold uppercase tracking-[0.1em] backdrop-blur-sm ${CAT_META[secondary.category].bg} ${CAT_META[secondary.category].color}`}
            >
              <span
                className={`h-1 w-1 rounded-full ${CAT_META[secondary.category].dot}`}
                aria-hidden="true"
              />
              {CAT_META[secondary.category].label}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3 p-5 sm:p-6">
            {/* "02 / FEATURED" label */}
            <div className="flex items-center gap-2">
              <span className="font-heading text-sm font-black text-terracotta/30">02</span>
              <div className="h-px flex-1 bg-sand/60 dark:bg-sand/20" />
              <span className="font-ui text-[9px] text-warm-gray/40 uppercase tracking-[0.2em]">
                Featured
              </span>
            </div>

            <h2 className="font-heading text-lg font-bold text-espresso leading-snug group-hover:text-terracotta transition-colors duration-200">
              {secondary.title}
            </h2>
            <p className="line-clamp-2 font-body text-[13px] text-warm-gray leading-relaxed">
              {secondary.excerpt}
            </p>

            {/* Meta row */}
            <div className="mt-auto flex items-center justify-between border-t border-sand/40 pt-3 dark:border-sand/20">
              <div>
                <p className="font-ui text-[11px] font-semibold text-espresso">
                  {secondary.author}
                </p>
                <div className="flex items-center gap-1.5 font-ui text-[10px] text-warm-gray/60">
                  <span>{formatDate(secondary.date)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{secondary.readTime} min read</span>
                </div>
              </div>
              <Link
                href={`/blog/${secondary.slug}`}
                aria-label={`Read: ${secondary.title}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linen text-espresso transition-all duration-200 hover:bg-terracotta hover:text-cream"
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
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.article>
      )}
    </div>
  );
}

/* ─── Blog card ───────────────────────────────────────────────────────────── */
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cat = CAT_META[post.category];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sand/60 bg-white transition-shadow duration-300 hover:shadow-lg hover:shadow-espresso/6 dark:border-sand/20 dark:bg-sand/5"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <BlogImage
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-espresso/20 to-transparent" />
        <span
          className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-ui text-[10px] font-semibold uppercase tracking-[0.1em] backdrop-blur-sm ${cat.bg} ${cat.color}`}
        >
          <span className={`h-1 w-1 rounded-full ${cat.dot}`} aria-hidden="true" />
          {cat.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-semibold text-espresso leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-terracotta">
          {post.title}
        </h3>
        <p className="mt-2 font-body text-[13px] text-warm-gray leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-sand/80 px-2.5 py-0.5 font-ui text-[10px] text-warm-gray/70 dark:border-sand/20"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Meta + link */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-sand/50 dark:border-sand/15">
          <div className="flex flex-col gap-0.5">
            <span className="font-ui text-[11px] font-medium text-espresso">{post.author}</span>
            <div className="flex items-center gap-2 font-ui text-[10px] text-warm-gray/60">
              <span>{formatDate(post.date)}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime} min</span>
              <span aria-hidden="true">·</span>
              <span>{formatViews(post.views)} views</span>
            </div>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`Read: ${post.title}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sand transition-all duration-200 hover:border-terracotta hover:bg-terracotta hover:text-cream dark:border-sand/30"
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Pagination ──────────────────────────────────────────────────────────── */
interface PaginationProps {
  page: number;
  total: number;
  onPage: (p: number) => void;
}

function Pagination({ page, total, onPage }: PaginationProps) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  if (total <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-sand text-warm-gray transition-colors hover:border-terracotta/40 hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-35 dark:border-sand/30"
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
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPage(p)}
          aria-label={`Page ${p}`}
          aria-current={page === p ? 'page' : undefined}
          className={`flex h-9 w-9 items-center justify-center rounded-full font-ui text-[13px] transition-all duration-200 ${
            page === p
              ? 'bg-terracotta font-semibold text-cream shadow-sm'
              : 'border border-sand text-warm-gray hover:border-terracotta/40 hover:text-terracotta dark:border-sand/30'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPage(page + 1)}
        disabled={page === total}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-sand text-warm-gray transition-colors hover:border-terracotta/40 hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-35 dark:border-sand/30"
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
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export function BlogPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sort, setSort] = useState<SortKey>('newest');
  const [page, setPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 280);
    return () => clearTimeout(t);
  }, [query]);

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setPage(1);
  }, []);

  const featured = useMemo(() => POSTS.filter((p) => p.featured), []);

  const filtered = useMemo(() => {
    let result = POSTS;

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.author.toLowerCase().includes(q) ||
          p.category.includes(q),
      );
    }

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (sort === 'newest') result = [...result].sort((a, b) => b.date.localeCompare(a.date));
    else if (sort === 'oldest') result = [...result].sort((a, b) => a.date.localeCompare(b.date));
    else if (sort === 'popular') result = [...result].sort((a, b) => b.views - a.views);

    return result;
  }, [debouncedQuery, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const showFeatured = !debouncedQuery && category === 'all' && sort === 'newest' && page === 1;

  const CATEGORIES: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'craft', label: 'Craft' },
    { key: 'story', label: 'Stories' },
    { key: 'tutorial', label: 'Tutorials' },
    { key: 'culture', label: 'Culture' },
    { key: 'care', label: 'Care' },
  ];

  return (
    <div className="min-h-screen bg-cream dark:bg-cream">
      {/* Hero */}
      <section className="border-b border-sand/60 bg-linen/70 py-14 dark:border-sand/20 dark:bg-linen/10 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <span className="font-ui text-[11px] text-terracotta uppercase tracking-[0.22em]">
              The Stitchery Journal
            </span>
            <h1 className="mt-3 font-heading text-4xl font-semibold text-espresso leading-tight sm:text-5xl">
              Stories, Craft &
              <br />
              Himalayan Heritage
            </h1>
            <p className="mt-4 max-w-lg font-body text-base text-warm-gray leading-relaxed">
              Tutorials, artisan stories, cultural deep-dives, and care guides — everything you need
              to appreciate handmade crochet from the mountains of Nepal.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mt-8 max-w-xl"
          >
            <div className="relative">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute top-1/2 left-4 -translate-y-1/2 text-warm-gray/50"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, authors, tags…"
                className="w-full rounded-xl border border-sand bg-white py-3 pr-4 pl-11 font-body text-sm text-espresso placeholder:text-warm-gray/50 outline-none transition-all duration-200 focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 dark:border-sand/30 dark:bg-sand/5"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setQuery('');
                    searchRef.current?.focus();
                  }}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-warm-gray/50 transition-colors hover:text-espresso"
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
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Featured posts */}
        {showFeatured && (
          <section className="mb-12">
            <div className="mb-5 flex items-center gap-3">
              <h2 className="font-ui text-[11px] text-warm-gray uppercase tracking-[0.18em]">
                Featured
              </h2>
              <div className="flex-1 border-t border-sand/50 dark:border-sand/20" />
            </div>
            <FeaturedSection posts={featured} />
          </section>
        )}

        {/* Controls row */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = category === cat.key;
              const meta = cat.key !== 'all' ? CAT_META[cat.key as Category] : null;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setCategory(cat.key)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-ui text-[12px] transition-all duration-200 ${
                    isActive
                      ? 'bg-terracotta text-cream shadow-sm'
                      : 'border border-sand bg-white/80 text-warm-gray hover:border-terracotta/30 hover:text-espresso dark:border-sand/30 dark:bg-sand/5'
                  }`}
                >
                  {meta && isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-cream/60" aria-hidden="true" />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort select */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-ui text-[11px] text-warm-gray/60 uppercase tracking-[0.12em]">
              Sort
            </span>
            <div className="relative">
              <select
                title="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none rounded-lg border border-sand bg-white py-1.5 pr-8 pl-3 font-ui text-[12px] text-espresso outline-none transition-colors focus:border-terracotta dark:border-sand/30 dark:bg-sand/5"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="popular">Most popular</option>
              </select>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-warm-gray/50"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="font-ui text-[12px] text-warm-gray/60">
            {filtered.length === 0
              ? 'No articles found'
              : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} article${filtered.length !== 1 ? 's' : ''}`}
          </p>
          {debouncedQuery && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="font-ui text-[12px] text-terracotta transition-colors hover:text-mocha"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {paginated.length > 0 ? (
            <motion.div
              key={`${category}-${sort}-${debouncedQuery}-${page}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {paginated.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-24 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linen">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-warm-gray/40"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <div>
                <p className="font-ui text-sm font-medium text-espresso">No articles found</p>
                <p className="mt-1 font-ui text-xs text-warm-gray">
                  Try a different search term or category
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                  setSort('newest');
                }}
                className="mt-2 rounded-lg border border-sand px-4 py-2 font-ui text-sm text-warm-gray transition-colors hover:border-terracotta/40 hover:text-terracotta"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <Pagination page={page} total={totalPages} onPage={setPage} />
            <p className="font-ui text-[11px] text-warm-gray/50">
              Page {page} of {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
