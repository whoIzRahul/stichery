'use client';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { FallbackImage as Image } from '@/components/common';
import { Testimonials } from '@/features/home';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';

// ─── Data ────────────────────────────────────────────────────────────────────

const values = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Made with Intention',
    body: "Every stitch is deliberate. We don't mass-produce — each piece is hand-crafted to order, which means every item carries a story and a heartbeat.",
    color: '#c1644f',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
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
    title: 'Quality Above All',
    body: 'We source only the finest yarns — soft merino blends for sweaters, vibrant cotton for flowers, durable polyester for keyrings. Quality is non-negotiable.',
    color: '#a3b89a',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Rooted in Nepal',
    body: 'We celebrate Nepali craftsmanship, support local artisans, and ship Himalayan artistry across the country — keeping our heritage alive one loop at a time.',
    color: '#d4a447',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: 'Sustainably Mindful',
    body: 'Zero synthetic dyes on our floral range. Biodegradable packaging. We believe beautiful things should leave the planet better than they found it.',
    color: '#7a9e8a',
  },
] as const;

const team = [
  {
    name: 'Priya Shrestha',
    role: 'Founder & Lead Artisan',
    bio: 'Taught by her grandmother in Bhaktapur, Priya has been crocheting for 20 years. She designs every new pattern herself.',
    initials: 'PS',
    accent: '#c1644f',
    num: '01',
  },
  {
    name: 'Meena Tamang',
    role: 'Head of Custom Orders',
    bio: "Meena turns customers' wildest ideas into reality. If you can dream it, she can crochet it — no matter how complex the pattern.",
    initials: 'MT',
    accent: '#d4a447',
    num: '02',
  },
  {
    name: 'Sarita Gurung',
    role: 'Flowers Specialist',
    bio: "Sarita's floral arrangements have been featured at three Kathmandu weddings. Each bloom she creates is botanically accurate and breathtakingly lifelike.",
    initials: 'SG',
    accent: '#a3b89a',
    num: '03',
  },
  {
    name: 'Anisha Karki',
    role: 'Packaging & Dispatch',
    bio: "Every order that leaves Stitchery passes through Anisha's hands. She ensures every piece is wrapped with the care it deserves.",
    initials: 'AK',
    accent: '#9b8bb4',
    num: '04',
  },
] as const;

const process = [
  {
    step: '01',
    title: 'You Choose',
    body: "Browse our collection or describe your dream piece. We'll help you pick the right colours, size, and style.",
  },
  {
    step: '02',
    title: 'We Craft',
    body: 'Your artisan gets to work — hooking every stitch by hand, checking tension and colour at every stage.',
  },
  {
    step: '03',
    title: 'Quality Check',
    body: "Before packaging, every item is inspected against our 12-point quality checklist. If it doesn't pass, it's remade.",
  },
  {
    step: '04',
    title: 'Gift-Wrapped',
    body: 'Nestled in tissue, sealed with a wax stamp, and packed in our signature kraft box. Ready to gift straight from the bag.',
  },
  {
    step: '05',
    title: 'Delivered',
    body: 'Shipped across Nepal via our courier partners. Most orders reach Kathmandu Valley within 2 days.',
  },
] as const;

const faqs = [
  {
    q: 'Do you take custom orders?',
    a: "Absolutely — custom orders are our favourite thing. Tell us the item, your preferred colours, and any sizing details, and we'll send you a quote within 24 hours.",
  },
  {
    q: 'How long does a custom order take?',
    a: 'Most custom pieces are ready within 5–10 working days depending on complexity. Large bulk orders (10+ items) may take up to 3 weeks.',
  },
  {
    q: 'Do you ship outside Kathmandu?',
    a: 'Yes! We ship to all major cities across Nepal — Pokhara, Lalitpur, Bhaktapur, Chitwan, Butwal, Dharan, and more. Shipping typically takes 3–5 days outside the Valley.',
  },
  {
    q: 'What yarn do you use?',
    a: "We use a curated mix — premium acrylic and cotton for flowers & keyrings, soft merino blends for wearables, and thick cotton for home decor. We're happy to discuss yarn options on custom orders.",
  },
  {
    q: 'Can I return or exchange an item?',
    a: "We accept returns within 7 days for standard items if they arrive damaged or defective. Custom orders are non-refundable once production begins, but we'll remake anything that doesn't meet our quality standard.",
  },
  {
    q: 'Do you offer gift wrapping?',
    a: 'Every single order leaves us gift-ready — tissue paper, ribbon, and our signature wax-sealed kraft box. No extra charge. We also include a handwritten note on request.',
  },
] as const;

const stats = [
  { value: '4+', label: 'Years of Craft' },
  { value: '1.2K+', label: 'Happy Customers' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '30+', label: 'Unique Designs' },
] as const;

// ─── Sub-components ────────────────────────────────────────────────────────────

function CrochetMandala({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      width="100%"
      height="100%"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="200" cy="200" r="148" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="200" cy="200" r="106" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="200" cy="200" r="64" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="200" cy="200" r="28" stroke="currentColor" strokeWidth="0.8" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={200 + 10 * Math.cos(rad)}
            y1={200 + 10 * Math.sin(rad)}
            x2={200 + 190 * Math.cos(rad)}
            y2={200 + 190 * Math.sin(rad)}
            stroke="currentColor"
            strokeWidth="0.6"
          />
        );
      })}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={`d${deg}`}
            cx={200 + 148 * Math.cos(rad)}
            cy={200 + 148 * Math.sin(rad)}
            r="3.5"
            fill="currentColor"
          />
        );
      })}
      <circle cx="200" cy="200" r="10" fill="currentColor" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 font-ui text-[10px] font-semibold text-terracotta uppercase tracking-[0.22em]">
      {children}
    </p>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="border-b border-sand last:border-0"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-heading text-base text-espresso sm:text-lg">{q}</span>
        <span
          className={`mt-0.5 flex shrink-0 items-center justify-center rounded-full border border-sand p-1.5 text-terracotta transition-transform duration-300 ${open ? 'rotate-45' : 'rotate-0'}`}
        >
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-body text-sm text-warm-gray leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TeamCard({ member, index }: { member: (typeof team)[number]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [3, -3]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-120, 120], [-3, 3]), { stiffness: 200, damping: 20 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="group flex overflow-hidden rounded-xl border border-sand bg-cream transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Colored initials column */}
      <div
        className="flex w-20 shrink-0 flex-col items-center justify-center gap-1.5 sm:w-24"
        style={{ backgroundColor: member.accent }}
      >
        <span className="font-heading text-2xl font-bold text-cream">{member.initials}</span>
        <span className="font-heading text-[10px] text-cream/60">{member.num}</span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center gap-1.5 px-5 py-5">
        <h3 className="font-heading text-lg text-espresso">{member.name}</h3>
        <p
          className="font-ui text-[10px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: member.accent }}
        >
          {member.role}
        </p>
        <p className="font-body text-sm text-warm-gray leading-relaxed">{member.bio}</p>
      </div>
    </motion.div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden dark:[--color-espresso:#2c1a1a] dark:[--color-cream:#faf7f2] dark:[--color-terracotta:#c1644f] dark:[--color-rose:#d4927a] dark:[--color-mocha:#8b5e52] dark:[--color-sand:#e0d5c8] dark:[--color-warm-gray:#9a8878]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1670764732518-a4cec3b0dc09?auto=format&fit=crop&w=1800&q=85"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2c1a1a]/96 via-[#2c1a1a]/80 to-[#2c1a1a]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c1a1a]/70 via-transparent to-transparent" />
      </div>

      {/* Decorative mandala — right side, through the lighter gradient */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 w-[520px] -translate-y-1/2 translate-x-1/4 text-cream opacity-[0.05]"
        aria-hidden="true"
      >
        <CrochetMandala />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/8 px-3.5 py-1 font-ui text-cream/70 text-xs tracking-wide"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
          Handmade in Nepal
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 font-heading leading-[1.0] tracking-tight"
        >
          <span className="block text-[3.2rem] text-cream sm:text-[4.5rem] lg:text-[6rem]">
            Yarn, Patience,
          </span>
          <span className="block text-[3.2rem] sm:text-[4.5rem] lg:text-[6rem]">
            <em className="text-terracotta not-italic">&amp; a Whole Lot</em>
          </span>
          <span className="block text-[2.2rem] text-cream/30 sm:text-[3.2rem] lg:text-[4.2rem]">
            of Love.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="mt-6 max-w-lg font-body text-cream/55 leading-relaxed lg:text-lg"
        >
          Stitchery is a small Kathmandu studio where every product is hand-crocheted from scratch —
          no machines, no shortcuts, just skilled hands and an obsession with craft.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            href={AppPaths.products.list}
            className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 font-ui text-cream text-sm shadow-lg shadow-terracotta/20 transition-all duration-200 hover:bg-rose"
          >
            Shop the Collection
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.68 }}
          className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-6 border-cream/10 border-t pt-8"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-8">
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-3xl text-terracotta lg:text-4xl">{s.value}</span>
                <span className="font-ui text-[11px] text-cream/50 uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden h-8 w-px bg-cream/10 sm:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function OurStorySection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-heading text-4xl text-espresso leading-tight lg:text-5xl">
              From a Single Hook
              <br />
              to a <em className="text-terracotta not-italic">Studio</em>
            </h2>
            <div className="mt-6 flex flex-col gap-4 font-body text-base text-warm-gray leading-relaxed">
              <p>
                Stitchery began in 2020 inside a small apartment in Thamel, Kathmandu. Our founder
                Priya Shrestha had just returned from her grandmother&apos;s home in Bhaktapur,
                carrying a set of old aluminium crochet hooks and a notebook filled with hand-drawn
                patterns.
              </p>
              <p>
                What started as weekend stress-relief quickly became something more. Friends wanted
                the flowers. Neighbours wanted the keyrings. Local boutiques wanted the sweaters. By
                early 2021, Priya enlisted two artisans — Meena and Sarita — and Stitchery formally
                opened its doors.
              </p>
              <p>
                Today we are a team of four, proudly crafting out of our Thamel studio. Every
                product is still made by hand, one stitch at a time. The hooks are still aluminium.
                The patterns are still in that old notebook.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-sand" aria-hidden="true" />
              <span className="font-ui text-[10px] text-warm-gray uppercase tracking-widest">
                Est. 2020 &middot; Thamel, KTM
              </span>
              <div className="h-px flex-1 bg-sand" aria-hidden="true" />
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[420px] w-full max-w-md overflow-hidden rounded-2xl bg-linen">
              <div className="absolute inset-0 flex items-center justify-center text-terracotta opacity-[0.13]">
                <CrochetMandala className="h-full w-full" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="mb-4 text-terracotta/40"
                  aria-hidden="true"
                >
                  <path
                    d="M6 14c0-4.418 3.582-8 8-8V2C7.373 2 2 7.373 2 14v12h12V14H6zm18 0c0-4.418 3.582-8 8-8V2c-6.627 0-12 5.373-12 12v12h12V14h-8z"
                    fill="currentColor"
                  />
                </svg>
                <p className="font-heading text-xl text-espresso/80 italic leading-snug">
                  &ldquo;The best things are made slowly, with intention and care.&rdquo;
                </p>
                <p className="mt-4 font-ui text-[11px] text-warm-gray uppercase tracking-widest">
                  — Priya Shrestha, Founder
                </p>
              </div>
              <div
                className="absolute top-5 left-5 h-8 w-8 rounded-tl-sm border-l-2 border-t-2 border-terracotta/30"
                aria-hidden="true"
              />
              <div
                className="absolute right-5 bottom-5 h-8 w-8 rounded-br-sm border-r-2 border-b-2 border-terracotta/30"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="bg-linen py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 max-w-xl"
        >
          <SectionLabel>What We Believe</SectionLabel>
          <h2 className="font-heading text-4xl text-espresso leading-tight lg:text-5xl">
            Our Guiding <em className="text-terracotta not-italic">Values</em>
          </h2>
          <p className="mt-4 font-body text-base text-warm-gray leading-relaxed">
            These are in every product we make and every decision we take.
          </p>
        </motion.div>

        {/* Feature-banner cards: colored icon panel at top, text below */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Colored icon banner */}
              <div
                className="flex h-28 items-center justify-center"
                style={{ backgroundColor: `${v.color}14` }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: v.color, color: '#faf7f2' }}
                >
                  {v.icon}
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-heading text-xl text-espresso">{v.title}</h3>
                <p className="font-body text-sm text-warm-gray leading-relaxed">{v.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <SectionLabel>The Hands Behind It</SectionLabel>
            <h2 className="font-heading text-4xl text-espresso leading-tight lg:text-5xl">
              Meet the Team
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm text-warm-gray leading-relaxed sm:text-right">
            Four people, thousands of hours, one shared obsession with craft.
          </p>
        </motion.div>

        {/* Horizontal strip cards in 2-col grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="overflow-hidden bg-espresso py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-heading text-4xl text-cream leading-tight lg:text-5xl">
            From Yarn to <em className="text-terracotta not-italic">Your Door</em>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className="absolute top-8 left-8 hidden h-0.5 w-[calc(100%-4rem)] bg-terracotta/20 lg:block"
            aria-hidden="true"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="relative flex flex-col gap-4"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-terracotta/30 bg-espresso font-heading text-xl text-terracotta">
                  {p.step}
                </div>
                <h3 className="font-heading text-lg text-cream">{p.title}</h3>
                <p className="font-body text-sm text-cream/55 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_560px] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <SectionLabel>Questions &amp; Answers</SectionLabel>
            <h2 className="font-heading text-4xl text-espresso leading-tight lg:text-5xl">
              Things You
              <br />
              Might <em className="text-terracotta not-italic">Wonder</em>
            </h2>
            <p className="mt-5 font-body text-base text-warm-gray leading-relaxed">
              Didn&apos;t find what you need? Drop us a message and we&apos;ll get back to you
              within 24 hours.
            </p>
            <Link
              href={AppPaths.contact}
              className="mt-6 inline-flex items-center gap-2 font-ui text-[11px] text-terracotta uppercase tracking-[0.16em] transition-opacity hover:opacity-70"
            >
              Ask a question
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <div
              className="mt-12 hidden gap-2 lg:grid"
              style={{ gridTemplateColumns: 'repeat(8, 1fr)', gap: '10px' }}
              aria-hidden="true"
            >
              {Array.from({ length: 48 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static decorative grid, order never changes
                <span key={i} className="inline-block h-1 w-1 rounded-full bg-sand" />
              ))}
            </div>
          </motion.div>

          <div className="divide-y divide-sand rounded-2xl border border-sand bg-linen/40 px-6 py-2">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-terracotta py-20 lg:py-28">
      <div
        className="pointer-events-none absolute -right-20 -top-20 w-80 text-cream opacity-[0.07] sm:w-[28rem]"
        aria-hidden="true"
      >
        <CrochetMandala />
      </div>
      <div
        className="pointer-events-none absolute -left-16 -bottom-16 w-60 text-cream opacity-[0.05]"
        aria-hidden="true"
      >
        <CrochetMandala />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-ui text-[10px] font-semibold text-cream/60 uppercase tracking-[0.22em]">
            Ready to own a piece?
          </p>
          <h2 className="font-heading text-4xl text-cream leading-tight sm:text-5xl lg:text-6xl">
            Something Handmade
            <br />
            is Waiting for You
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-body text-base text-cream/70 leading-relaxed">
            Browse our full collection of handcrafted pieces, each made with love from the mountains
            of Nepal.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={AppPaths.products.list}
              className="inline-flex items-center gap-2 rounded-sm bg-cream px-7 py-3.5 font-ui text-terracotta text-sm uppercase tracking-[0.12em] transition-colors hover:bg-linen"
            >
              Shop Now
            </Link>
            <Link
              href={AppPaths.contact}
              className="inline-flex items-center gap-2 rounded-sm border border-cream/40 px-7 py-3.5 font-ui text-cream text-sm uppercase tracking-[0.12em] transition-colors hover:bg-cream/10"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <OurStorySection />
      <ValuesSection />
      <TeamSection />
      <ProcessSection />
      <Testimonials />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
