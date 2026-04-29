'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

function CrochetHookDecor() {
  return (
    <svg
      width="220"
      height="340"
      viewBox="0 0 220 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hook shaft */}
      <path
        d="M110 320 L110 80"
        stroke="rgba(250,247,242,0.07)"
        strokeWidth="18"
        strokeLinecap="round"
      />
      {/* Hook neck */}
      <path
        d="M110 80 Q110 40 140 28 Q170 16 178 36 Q186 56 162 62 Q138 68 126 52"
        stroke="rgba(250,247,242,0.07)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Grip texture marks */}
      <line
        x1="95"
        y1="180"
        x2="125"
        y2="180"
        stroke="rgba(250,247,242,0.04)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="95"
        y1="200"
        x2="125"
        y2="200"
        stroke="rgba(250,247,242,0.04)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="95"
        y1="220"
        x2="125"
        y2="220"
        stroke="rgba(250,247,242,0.04)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="95"
        y1="240"
        x2="125"
        y2="240"
        stroke="rgba(250,247,242,0.04)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden bg-espresso py-20 lg:py-28 dark:bg-[#100b05] dark:[--color-cream:#faf7f2] dark:[--color-espresso:#2c1a1a]">
      {/* Textile dot texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(250,247,242,0.055) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Crochet hook decorative SVG — right side */}
      <div
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-12 lg:right-16"
        aria-hidden="true"
      >
        <CrochetHookDecor />
      </div>

      {/* Left yarn loops */}
      <div
        className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 lg:left-20"
        aria-hidden="true"
      >
        <svg width="80" height="160" viewBox="0 0 80 160" fill="none" aria-hidden="true">
          <ellipse
            cx="30"
            cy="40"
            rx="22"
            ry="30"
            stroke="rgba(193,100,79,0.12)"
            strokeWidth="2"
            fill="none"
          />
          <ellipse
            cx="50"
            cy="80"
            rx="22"
            ry="30"
            stroke="rgba(193,100,79,0.09)"
            strokeWidth="2"
            fill="none"
          />
          <ellipse
            cx="30"
            cy="120"
            rx="22"
            ry="30"
            stroke="rgba(193,100,79,0.12)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-lg px-4 text-center sm:px-6">
        {/* Section label with stitch marks */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px w-10 bg-terracotta/35" />
          <span className="font-ui text-[10px] font-semibold text-terracotta uppercase tracking-[0.28em]">
            Craft Circle
          </span>
          <span className="h-px w-10 bg-terracotta/35" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mb-4 font-heading text-4xl text-cream italic leading-tight lg:text-5xl"
        >
          Never Miss a New Stitch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 font-body text-base text-cream/50 leading-relaxed"
        >
          New collections, maker stories, and exclusive discounts — woven straight to your inbox.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22 }}
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-sage/30 bg-sage/10">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A3B89A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-heading text-2xl text-cream italic">You&apos;re in the circle!</p>
              <p className="font-body text-cream/50 text-sm">
                Check your inbox for a little surprise from us.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Bottom-border only input — handwritten feel */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  aria-label="Email address"
                  className="w-full border-b-2 border-cream/20 bg-transparent px-0 pb-3 pt-1 font-body text-cream text-base placeholder:text-cream/30 focus:border-terracotta focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-sm bg-terracotta py-4 font-ui text-cream text-sm uppercase tracking-[0.14em] transition-colors duration-200 hover:bg-rose"
              >
                Join the Circle
              </button>
            </form>
          )}
        </motion.div>

        <p className="mt-5 font-body text-cream/25 text-xs">No spam, ever · Unsubscribe anytime</p>
      </div>
    </section>
  );
}
