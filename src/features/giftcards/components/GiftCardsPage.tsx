'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

/* ─── Types ───────────────────────────────────────────────────────────────── */
type CardStatus = 'available' | 'collected' | 'expired';
type FilterKey = 'all' | CardStatus;

interface GiftCard {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  code: string;
  discount: string;
  expiry: string;
  status: CardStatus;
  theme: CardTheme;
  minSpend?: string;
}

interface CardTheme {
  gradient: string;
  shimmer: string;
  badge: string;
  valueColor: string;
  patternClass: string;
}

/* ─── Card themes ─────────────────────────────────────────────────────────── */
const THEMES: Record<string, CardTheme> = {
  rose: {
    gradient: 'from-[#C9523A] via-[#A0365E] to-[#6B1A3A]',
    shimmer: 'from-transparent via-white/10 to-transparent',
    badge: 'bg-white/20 text-white',
    valueColor: 'text-white',
    patternClass: 'pattern-rose',
  },
  sage: {
    gradient: 'from-[#4A7C6F] via-[#2F5C52] to-[#1E3D38]',
    shimmer: 'from-transparent via-white/10 to-transparent',
    badge: 'bg-white/20 text-white',
    valueColor: 'text-white',
    patternClass: 'pattern-sage',
  },
  amber: {
    gradient: 'from-[#C8860A] via-[#A06010] to-[#6B3A08]',
    shimmer: 'from-transparent via-white/15 to-transparent',
    badge: 'bg-white/20 text-white',
    valueColor: 'text-white',
    patternClass: 'pattern-amber',
  },
  espresso: {
    gradient: 'from-[#2C1A1A] via-[#4A2C2A] to-[#1A0F0F]',
    shimmer: 'from-transparent via-white/8 to-transparent',
    badge: 'bg-white/15 text-white',
    valueColor: 'text-white',
    patternClass: 'pattern-espresso',
  },
  lavender: {
    gradient: 'from-[#7C6FA0] via-[#5C4E7A] to-[#3A3060]',
    shimmer: 'from-transparent via-white/12 to-transparent',
    badge: 'bg-white/20 text-white',
    valueColor: 'text-white',
    patternClass: 'pattern-lavender',
  },
};

/* ─── Mock data ───────────────────────────────────────────────────────────── */
const MOCK_CARDS: GiftCard[] = [
  {
    id: 'gc1',
    title: 'Himalayan Bloom',
    subtitle: 'Spring Collection',
    value: 'रू 200 OFF',
    code: 'BLOOM200',
    discount: '₹200 off any order',
    expiry: '2026-06-30',
    status: 'available',
    theme: THEMES.rose,
    minSpend: 'रू 800',
  },
  {
    id: 'gc2',
    title: 'Mountain Mist',
    subtitle: 'Member Exclusive',
    value: '15% OFF',
    code: 'MIST15',
    discount: '15% off sitewide',
    expiry: '2026-07-15',
    status: 'available',
    theme: THEMES.sage,
    minSpend: 'रू 500',
  },
  {
    id: 'gc3',
    title: 'Golden Hour',
    subtitle: 'Flash Offer',
    value: 'रू 500 OFF',
    code: 'GOLDEN500',
    discount: '₹500 off orders above रू 1,500',
    expiry: '2026-05-31',
    status: 'available',
    theme: THEMES.amber,
    minSpend: 'रू 1,500',
  },
  {
    id: 'gc4',
    title: 'Artisan Premium',
    subtitle: 'Loyalty Reward',
    value: '25% OFF',
    code: 'ARTISAN25',
    discount: '25% off handwoven collection',
    expiry: '2026-08-01',
    status: 'collected',
    theme: THEMES.espresso,
  },
  {
    id: 'gc5',
    title: 'Spring Petals',
    subtitle: 'New Arrival',
    value: 'रू 150 OFF',
    code: 'PETALS150',
    discount: '₹150 off flowers & keyrings',
    expiry: '2026-05-20',
    status: 'collected',
    theme: THEMES.lavender,
    minSpend: 'रू 400',
  },
  {
    id: 'gc6',
    title: 'Winter Warmth',
    subtitle: 'Season Offer',
    value: '20% OFF',
    code: 'WINTER20',
    discount: '20% off woollen items',
    expiry: '2026-02-28',
    status: 'expired',
    theme: THEMES.espresso,
  },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function formatExpiry(iso: string): string {
  return new Date(iso).toLocaleDateString('en-NP', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function daysLeft(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

/* ─── Gift Card visual ────────────────────────────────────────────────────── */
function CardBack({ card }: { card: GiftCard; copied?: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Code section */}
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <p className="font-ui text-[10px] text-white/60 uppercase tracking-[0.2em]">Coupon Code</p>
        <div className="rounded-lg border border-white/20 bg-black/25 px-5 py-2.5 backdrop-blur-sm">
          <span className="font-mono text-lg font-bold tracking-[0.25em] text-white">
            {card.code}
          </span>
        </div>
        <p className="font-ui text-[11px] text-white/70">{card.discount}</p>
        {card.minSpend && (
          <p className="font-ui text-[10px] text-white/50">Min. spend {card.minSpend}</p>
        )}
      </div>
      {/* Expiry */}
      <div className="flex items-center justify-between border-t border-white/15 pt-3">
        <span className="font-ui text-[10px] text-white/50 uppercase tracking-[0.15em]">
          Expires
        </span>
        <span className="font-ui text-[11px] font-medium text-white/80">
          {formatExpiry(card.expiry)}
        </span>
      </div>
    </div>
  );
}

/* ─── Single card ─────────────────────────────────────────────────────────── */
interface GiftCardProps {
  card: GiftCard;
  onCollect: (id: string) => void;
  onCopy: (id: string) => void;
  copiedId: string | null;
}

function GiftCardItem({ card, onCollect, onCopy, copiedId }: GiftCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { theme } = card;
  const days = daysLeft(card.expiry);
  const isExpired = card.status === 'expired';
  const isCollected = card.status === 'collected';
  const isCopied = copiedId === card.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-4"
    >
      {/* Card */}
      <button
        type="button"
        className={`relative w-full border-0 bg-transparent p-0 ${isExpired ? 'cursor-default' : 'cursor-pointer'}`}
        style={{ perspective: '1200px' }}
        onClick={() => !isExpired && setFlipped((v) => !v)}
        aria-label={`${card.title} gift card — tap to ${flipped ? 'hide' : 'show'} code`}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full"
        >
          {/* Front face */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${theme.gradient} p-6 shadow-xl`}
          >
            {/* Decorative circles */}
            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-black/10" />

            {/* Shimmer stripe */}
            <div
              className={`absolute inset-0 bg-linear-to-r ${theme.shimmer} translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[200%]`}
              aria-hidden="true"
            />

            {/* Expired overlay */}
            {isExpired && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-[1px]">
                <span className="rotate-[-15deg] rounded-full border-2 border-white/40 px-5 py-2 font-ui text-sm font-bold text-white/60 uppercase tracking-[0.2em]">
                  Expired
                </span>
              </div>
            )}

            {/* Card content */}
            <div className="relative flex h-36 flex-col justify-between sm:h-40">
              <div className="flex items-start justify-between">
                {/* Logo mark */}
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 240 240" width="22" height="22" aria-hidden="true">
                    <g
                      fill="none"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <ellipse cx="80" cy="70" rx="34" ry="22" transform="rotate(-22 80 70)" />
                      <ellipse cx="120" cy="120" rx="34" ry="22" />
                      <ellipse cx="160" cy="170" rx="34" ry="22" transform="rotate(-22 160 170)" />
                    </g>
                  </svg>
                  <span className="font-ui text-[10px] text-white/60 uppercase tracking-[0.18em]">
                    Stitchery
                  </span>
                </div>

                {/* Type badge */}
                <span
                  className={`rounded-full px-2.5 py-1 font-ui text-[10px] uppercase tracking-[0.15em] ${theme.badge}`}
                >
                  {card.subtitle}
                </span>
              </div>

              {/* Value */}
              <div>
                <p className="font-ui text-[10px] text-white/50 uppercase tracking-[0.18em]">
                  {card.title}
                </p>
                <p
                  className={`mt-1 font-heading text-3xl font-bold sm:text-4xl ${theme.valueColor}`}
                >
                  {card.value}
                </p>
              </div>

              {/* Bottom row */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-ui text-[9px] text-white/40 uppercase tracking-[0.15em]">
                    Valid until
                  </p>
                  <p className="font-ui text-[11px] text-white/70">{formatExpiry(card.expiry)}</p>
                </div>
                {/* Chip decoration */}
                <div className="flex h-7 w-10 items-center justify-center rounded-md border border-white/20 bg-white/10">
                  <div className="grid grid-cols-2 gap-0.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="h-1.5 w-1.5 rounded-[1px] bg-white/30" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Flip hint */}
            {!isExpired && (
              <div className="mt-3 flex items-center justify-center gap-1 border-t border-white/10 pt-2">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/30"
                  aria-hidden="true"
                >
                  <path d="M1 4v6h6" />
                  <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
                </svg>
                <span className="font-ui text-[9px] text-white/30 uppercase tracking-[0.15em]">
                  Tap to reveal code
                </span>
              </div>
            )}
          </div>

          {/* Back face */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              position: 'absolute',
              inset: 0,
            }}
            className={`overflow-hidden rounded-2xl bg-linear-to-br ${theme.gradient} p-6 shadow-xl`}
          >
            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-black/10" />
            <div className="relative h-full">
              <CardBack card={card} copied={isCopied} />
            </div>
          </div>
        </motion.div>
      </button>

      {/* Action row */}
      <div className="flex items-center justify-between gap-3">
        {/* Urgency pill */}
        <div className="flex items-center gap-1.5">
          {!isExpired && !isCollected && days <= 7 && (
            <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 font-ui text-[10px] font-semibold text-red-500 dark:bg-red-900/20">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              {days}d left
            </span>
          )}
          {isCollected && !isExpired && (
            <span className="flex items-center gap-1 rounded-full bg-sage/10 px-2.5 py-1 font-ui text-[10px] font-semibold text-sage">
              <svg
                width="10"
                height="10"
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
              Collected
            </span>
          )}
        </div>

        {/* CTA button */}
        {isExpired ? (
          <span className="rounded-lg border border-sand px-4 py-2 font-ui text-[12px] text-warm-gray/50 dark:border-sand/20">
            Expired
          </span>
        ) : isCollected ? (
          <button
            type="button"
            onClick={() => onCopy(card.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-ui text-[12px] font-medium transition-all duration-200 ${
              isCopied
                ? 'bg-sage text-white'
                : 'bg-espresso text-cream hover:bg-mocha dark:bg-sand/20 dark:text-espresso dark:hover:bg-sand/30'
            }`}
          >
            {isCopied ? (
              <>
                <svg
                  width="12"
                  height="12"
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
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Code
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onCollect(card.id)}
            className="flex items-center gap-2 rounded-lg bg-terracotta px-4 py-2 font-ui text-[12px] font-medium text-cream shadow-sm shadow-terracotta/20 transition-all duration-200 hover:bg-mocha"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 12v10H4V12" />
              <path d="M22 7H2v5h20V7z" />
              <path d="M12 22V7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
            Collect
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Filter tabs ─────────────────────────────────────────────────────────── */
const FILTER_TABS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'available', label: 'Available' },
  { key: 'collected', label: 'Collected' },
  { key: 'expired', label: 'Expired' },
];

/* ─── Page ────────────────────────────────────────────────────────────────── */
export function GiftCardsPage() {
  const [cards, setCards] = useState<GiftCard[]>(MOCK_CARDS);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      all: cards.length,
      available: cards.filter((c) => c.status === 'available').length,
      collected: cards.filter((c) => c.status === 'collected').length,
      expired: cards.filter((c) => c.status === 'expired').length,
    }),
    [cards],
  );

  const filtered = useMemo(
    () => (filter === 'all' ? cards : cards.filter((c) => c.status === filter)),
    [cards, filter],
  );

  function handleCollect(id: string) {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'collected' } : c)));
  }

  function handleCopy(id: string) {
    const card = cards.find((c) => c.id === id);
    if (!card) return;
    navigator.clipboard.writeText(card.code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-espresso via-mocha to-terracotta py-20 sm:py-28">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-terracotta/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-rose/15 blur-3xl" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.03]" aria-hidden="true">
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 font-ui text-[11px] text-cream uppercase tracking-[0.2em] backdrop-blur-sm">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 12v10H4V12" />
                <path d="M22 7H2v5h20V7z" />
                <path d="M12 22V7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
              Gift Cards & Coupons
            </span>

            <h1 className="mt-5 font-heading text-4xl text-cream leading-tight sm:text-5xl lg:text-6xl">
              Collect & Redeem
              <br />
              <span className="text-terracotta">Exclusive Offers</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-body text-base text-cream/65 leading-relaxed">
              Unlock savings on every handcrafted piece. Collect a coupon, copy the code, and apply
              it at checkout for instant discounts.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { value: String(counts.available), label: 'Available' },
              { value: String(counts.collected), label: 'Collected' },
              {
                value: `रू ${cards.filter((c) => c.status === 'collected').length * 250}`,
                label: 'Saved',
              },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span className="font-heading text-3xl font-bold text-cream">{s.value}</span>
                <span className="font-ui text-[11px] text-cream/50 uppercase tracking-[0.15em]">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-sand bg-linen/50 dark:border-sand/20 dark:bg-linen/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {[
              {
                step: '01',
                label: 'Find a card',
                desc: 'Browse available gift cards below',
              },
              {
                step: '02',
                label: 'Collect it',
                desc: 'Tap Collect to save to your account',
              },
              {
                step: '03',
                label: 'Copy code',
                desc: 'Flip the card and copy the code',
              },
              {
                step: '04',
                label: 'Redeem',
                desc: 'Paste at checkout for instant savings',
              },
            ].map((item, i) => (
              <div key={item.step} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-2xl font-bold text-terracotta/30">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-ui text-sm font-semibold text-espresso">{item.label}</p>
                    <p className="font-body text-xs text-warm-gray">{item.desc}</p>
                  </div>
                </div>
                {i < 3 && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hidden text-sand sm:block"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cards grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-2xl text-espresso">Your Gift Cards</h2>
          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map((tab) => {
              const count = counts[tab.key];
              const isActive = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 font-ui text-[12px] transition-all duration-200 ${
                    isActive
                      ? 'bg-terracotta text-cream shadow-sm'
                      : 'border border-sand bg-white/60 text-warm-gray hover:border-terracotta/30 hover:text-espresso dark:bg-sand/5'
                  }`}
                >
                  {tab.label}
                  {count !== undefined && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 font-bold text-[10px] leading-none ${
                        isActive ? 'bg-white/25 text-cream' : 'bg-sand text-espresso'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((card) => (
                <GiftCardItem
                  key={card.id}
                  card={card}
                  onCollect={handleCollect}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                />
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
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-warm-gray/40"
                  aria-hidden="true"
                >
                  <path d="M20 12v10H4V12" />
                  <path d="M22 7H2v5h20V7z" />
                  <path d="M12 22V7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              </div>
              <div>
                <p className="font-ui text-sm font-medium text-espresso">Nothing here yet</p>
                <p className="mt-1 font-ui text-xs text-warm-gray">
                  No gift cards in this category
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <p className="mt-12 text-center font-body text-xs text-warm-gray/50">
          Gift cards are issued by Stitchery Nepal Pvt. Ltd. Codes are single-use and
          non-transferable. See{' '}
          <a href="/terms" className="underline hover:text-warm-gray">
            terms &amp; conditions
          </a>{' '}
          for full details.
        </p>
      </section>
    </div>
  );
}
