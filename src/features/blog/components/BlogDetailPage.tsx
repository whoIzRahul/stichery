'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { BlogPost, Category, ContentBlock } from '../data';
import { CAT_META, formatDate, formatViews, POSTS } from '../data';

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
    // biome-ignore lint/performance/noImgElement: external image
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  );
}

/* ─── Reading progress bar ────────────────────────────────────────────────── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[60] h-0.5 w-full bg-sand/30" aria-hidden="true">
      <motion.div
        className="h-full bg-terracotta"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

/* ─── Content block renderer ──────────────────────────────────────────────── */
function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block) => {
        const key = `block `;
        switch (block.type) {
          case 'heading':
            return (
              <motion.h2
                key={key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35 }}
                id={block.text?.toLowerCase().replace(/\s+/g, '-')}
                className="mt-4 font-heading text-2xl font-bold text-espresso"
              >
                {block.text}
              </motion.h2>
            );
          case 'paragraph':
            return (
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35 }}
                className="font-body text-[15px] text-warm-gray leading-[1.85]"
              >
                {block.text}
              </motion.p>
            );
          case 'blockquote':
            return (
              <motion.blockquote
                key={key}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="relative my-2 overflow-hidden rounded-r-xl border-l-4 border-terracotta bg-linen/70 px-6 py-5 dark:bg-linen/10"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute top-3 right-4 text-terracotta/15"
                  aria-hidden="true"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                <p className="font-body text-base text-espresso italic leading-relaxed">
                  &ldquo;{block.text}&rdquo;
                </p>
                {block.attribution && (
                  <p className="mt-3 font-ui text-[12px] text-warm-gray/70">{block.attribution}</p>
                )}
              </motion.blockquote>
            );
          case 'list':
            return (
              <motion.ul
                key={key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-2.5 pl-1"
              >
                {block.items?.map((item) => (
                  <li
                    key={`${key}-item-${item}`}
                    className="flex items-start gap-3 font-body text-[15px] text-warm-gray leading-relaxed"
                  >
                    <span className="mt-[5px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terracotta/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    </span>
                    {item}
                  </li>
                ))}
              </motion.ul>
            );
          case 'tip':
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35 }}
                className="flex gap-3 rounded-xl border border-sage/25 bg-sage/8 p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <p className="font-body text-[14px] text-espresso leading-relaxed">{block.text}</p>
              </motion.div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ─── Table of contents ───────────────────────────────────────────────────── */
function TableOfContents({ blocks }: { blocks: ContentBlock[] }) {
  const headings = blocks.filter((b) => b.type === 'heading' && b.text);
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-xl border border-sand bg-linen/50 p-4 dark:border-sand/20 dark:bg-linen/10"
    >
      <p className="mb-3 font-ui text-[10px] text-warm-gray uppercase tracking-[0.18em]">
        In this article
      </p>
      <ul className="flex flex-col gap-1.5">
        {headings.map((h) => (
          <li key={`toc-${h}`}>
            <a
              href={`#${h.text?.toLowerCase().replace(/\s+/g, '-')}`}
              className="group flex items-center gap-2 rounded-md px-2 py-1.5 font-ui text-[12px] text-warm-gray transition-all duration-200 hover:bg-sand/40 hover:text-terracotta"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-warm-gray/30 transition-colors group-hover:bg-terracotta" />
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ─── Related post card ───────────────────────────────────────────────────── */
function RelatedCard({ post }: { post: BlogPost }) {
  const cat = CAT_META[post.category];
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex gap-3 rounded-xl border border-sand/60 bg-white p-3 transition-all duration-200 hover:border-terracotta/20 hover:shadow-md dark:border-sand/20 dark:bg-sand/5"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
        <BlogImage
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <span
          className={`font-ui text-[10px] font-semibold uppercase tracking-[0.1em] ${cat.color}`}
        >
          {cat.label}
        </span>
        <p className="mt-0.5 font-ui text-[12px] font-medium text-espresso leading-snug line-clamp-2 group-hover:text-terracotta transition-colors">
          {post.title}
        </p>
        <p className="mt-1 font-ui text-[10px] text-warm-gray/60">{post.readTime} min read</p>
      </div>
    </a>
  );
}

/* ─── Category sidebar widget ─────────────────────────────────────────────── */
const ALL_CATEGORIES: { key: Category; label: string }[] = [
  { key: 'craft', label: 'Craft' },
  { key: 'story', label: 'Stories' },
  { key: 'tutorial', label: 'Tutorials' },
  { key: 'culture', label: 'Culture' },
  { key: 'care', label: 'Care' },
];

function CategoryWidget({ activeCategory }: { activeCategory: Category }) {
  return (
    <div className="rounded-xl border border-sand bg-white p-4 dark:border-sand/20 dark:bg-sand/5">
      <p className="mb-3 font-ui text-[10px] text-warm-gray uppercase tracking-[0.18em]">
        Categories
      </p>
      <div className="flex flex-col gap-1">
        {ALL_CATEGORIES.map(({ key, label }) => {
          const meta = CAT_META[key];
          const count = POSTS.filter((p) => p.category === key).length;
          const isActive = key === activeCategory;
          return (
            <a
              key={key}
              href={`/blog?category=${key}`}
              className={`group flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 ${
                isActive
                  ? `${meta.bg} ${meta.color}`
                  : 'text-warm-gray hover:bg-linen hover:text-espresso dark:hover:bg-sand/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
                <span className="font-ui text-[12px]">{label}</span>
              </div>
              <span
                className={`rounded-full px-1.5 py-0.5 font-ui text-[10px] font-bold leading-none ${
                  isActive ? 'bg-white/30' : 'bg-sand/70 text-espresso/60 dark:bg-sand/20'
                }`}
              >
                {count}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ─── 404 state ───────────────────────────────────────────────────────────── */
function PostNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linen">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-warm-gray/40"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      </div>
      <div>
        <h1 className="font-heading text-2xl font-semibold text-espresso">Article not found</h1>
        <p className="mt-2 font-body text-sm text-warm-gray">
          This article does not exist or may have been moved.
        </p>
      </div>
      <a
        href="/blog"
        className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-5 py-2.5 font-ui text-sm text-cream shadow-sm shadow-terracotta/20 transition-all hover:bg-mocha"
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
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </a>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────────────────── */
export function BlogDetailPage({ slug }: { slug: string }) {
  const post = POSTS.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  if (!post) return <PostNotFound />;

  const cat = CAT_META[post.category];
  const related = POSTS.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <ReadingProgress />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative h-[55vh] overflow-hidden sm:h-[65vh]">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <BlogImage src={post.image} alt={post.title} className="h-full w-full object-cover" />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-espresso/80 via-espresso/20 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-espresso/30 to-transparent" />

        {/* Content anchored to bottom */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <nav
              className="mb-4 flex items-center gap-2 font-ui text-[11px] text-cream/60"
              aria-label="Breadcrumb"
            >
              <a href="/blog" className="transition-colors hover:text-cream">
                Blog
              </a>
              <span aria-hidden="true">/</span>
              <span className={`${cat.color} font-semibold`}>{cat.label}</span>
              <span aria-hidden="true">/</span>
              <span className="line-clamp-1 text-cream/80">{post.title}</span>
            </nav>

            {/* Category + read time */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm ${cat.bg} ${cat.color}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${cat.dot}`} aria-hidden="true" />
                {cat.label}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1 font-ui text-[10px] text-cream/70 backdrop-blur-sm">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {post.readTime} min read
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1 font-ui text-[10px] text-cream/70 backdrop-blur-sm">
                {formatViews(post.views)} views
              </span>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="font-heading text-3xl font-bold text-cream leading-tight sm:text-4xl lg:text-5xl"
            >
              {post.title}
            </motion.h1>

            {/* Author + date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-4 flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta font-heading text-sm font-bold text-cream">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-ui text-[12px] font-semibold text-cream/90">{post.author}</p>
                <p className="font-ui text-[11px] text-cream/55">
                  {post.authorRole} · {formatDate(post.date)}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Main article */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Excerpt / lead */}
            <p className="mb-8 border-l-2 border-terracotta pl-4 font-body text-base text-espresso italic leading-relaxed sm:text-lg">
              {post.excerpt}
            </p>

            {/* Body content */}
            <ContentRenderer blocks={post.content} />

            {/* Tags */}
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-sand pt-6 dark:border-sand/20">
              <span className="font-ui text-[11px] text-warm-gray/60 uppercase tracking-[0.15em]">
                Tags
              </span>
              {post.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog?q=${tag}`}
                  className="rounded-full border border-sand/80 px-3 py-1 font-ui text-[11px] text-warm-gray/70 transition-all hover:border-terracotta/30 hover:text-terracotta dark:border-sand/20"
                >
                  #{tag}
                </a>
              ))}
            </div>

            {/* Share row */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="font-ui text-[11px] text-warm-gray/60 uppercase tracking-[0.15em]">
                Share
              </span>
              <button
                type="button"
                onClick={copyLink}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-ui text-[12px] transition-all duration-200 ${
                  copied
                    ? 'border-sage/30 bg-sage/10 text-sage'
                    : 'border-sand text-warm-gray hover:border-terracotta/30 hover:text-terracotta dark:border-sand/20'
                }`}
              >
                {copied ? (
                  <>
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
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    Copy link
                  </>
                )}
              </button>
            </div>

            {/* Author bio card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mt-10 flex gap-4 rounded-2xl border border-sand bg-linen/50 p-5 dark:border-sand/20 dark:bg-linen/10"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-terracotta font-heading text-xl font-bold text-cream">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-ui text-sm font-semibold text-espresso">{post.author}</p>
                <p className="font-ui text-[12px] text-terracotta">{post.authorRole}</p>
                <p className="mt-1.5 font-body text-[13px] text-warm-gray leading-relaxed">
                  A passionate artisan and storyteller at Stitchery, dedicated to preserving the
                  crochet traditions of Nepal for future generations.
                </p>
              </div>
            </motion.div>

            {/* Back link */}
            <div className="mt-8">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg border border-sand px-4 py-2.5 font-ui text-[12px] text-warm-gray transition-all duration-200 hover:border-terracotta/40 hover:text-terracotta dark:border-sand/30"
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
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to all articles
              </a>
            </div>
          </motion.article>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className="flex flex-col gap-6">
            <div className="sticky top-20 flex flex-col gap-6">
              {/* Table of contents */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
              >
                <TableOfContents blocks={post.content} />
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.18 }}
              >
                <CategoryWidget activeCategory={post.category} />
              </motion.div>

              {/* Related posts */}
              {related.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.26 }}
                  className="rounded-xl border border-sand bg-white p-4 dark:border-sand/20 dark:bg-sand/5"
                >
                  <p className="mb-3 font-ui text-[10px] text-warm-gray uppercase tracking-[0.18em]">
                    Related Articles
                  </p>
                  <div className="flex flex-col gap-3">
                    {related.map((r) => (
                      <RelatedCard key={r.id} post={r} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Newsletter CTA */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.34 }}
                className="overflow-hidden rounded-xl bg-linear-to-br from-espresso to-mocha p-5"
              >
                <p className="font-ui text-[10px] text-cream/50 uppercase tracking-[0.18em]">
                  Newsletter
                </p>
                <p className="mt-1.5 font-heading text-base font-semibold text-cream leading-snug">
                  Stories from the Mountains, in Your Inbox
                </p>
                <p className="mt-1.5 font-body text-[12px] text-cream/65 leading-relaxed">
                  New articles, tutorials, and crochet patterns — every two weeks.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="rounded-lg border border-cream/15 bg-cream/10 px-3 py-2 font-body text-[12px] text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-cream/30"
                  />
                  <button
                    type="button"
                    className="rounded-lg bg-terracotta px-3 py-2 font-ui text-[12px] font-semibold text-cream transition-colors hover:bg-rose"
                  >
                    Subscribe
                  </button>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
