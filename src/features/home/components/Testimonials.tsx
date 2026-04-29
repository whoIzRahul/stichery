'use client';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: '1',
    num: '01',
    name: 'Sunita Sharma',
    location: 'Kathmandu',
    rating: 5,
    text: 'The rose bouquet I ordered exceeded all my expectations. The craftsmanship is impeccable — every petal is perfectly formed. It arrived beautifully packaged with a handwritten note. It is now the centrepiece of my living room!',
    date: 'March 2025',
    initials: 'SS',
    accentColor: '#c1644f',
  },
  {
    id: '2',
    num: '02',
    name: 'Anita Gurung',
    location: 'Pokhara',
    rating: 5,
    text: "I ordered a custom hand-knitted sweater with specific colour requests. The team was so accommodating and the result was absolutely stunning — perfect for our Pokhara winters. We're lifelong customers now.",
    date: 'February 2025',
    initials: 'AG',
    accentColor: '#a3b89a',
  },
  {
    id: '3',
    num: '03',
    name: 'Sita Tamang',
    location: 'Lalitpur',
    rating: 5,
    text: 'Ordered 10 crochet key rings as wedding favours and every single one was perfect. My guests were amazed that something so beautiful could be handmade. The quality is remarkable and the price was incredibly reasonable.',
    date: 'April 2025',
    initials: 'ST',
    accentColor: '#d4a447',
  },
] as const;

const marqueePhrases = [
  '⭐⭐⭐⭐⭐  Impeccable Craftsmanship',
  '·  Ships Across Nepal  ·',
  '⭐⭐⭐⭐⭐  Gift-Ready Packaging',
  '·  800+ Happy Customers  ·',
  '⭐⭐⭐⭐⭐  Handmade with Love',
  '·  98% Satisfaction Rate  ·',
  '⭐⭐⭐⭐⭐  Impeccable Craftsmanship',
  '·  Ships Across Nepal  ·',
  '⭐⭐⭐⭐⭐  Gift-Ready Packaging',
  '·  800+ Happy Customers  ·',
  '⭐⭐⭐⭐⭐  Handmade with Love',
  '·  98% Satisfaction Rate  ·',
];

const cardOffsets = ['mt-0', 'mt-14', 'mt-7'] as const;

export function Testimonials() {
  return (
    <section className="overflow-hidden bg-linen py-16 lg:py-24">
      {/* Scrolling marquee strip */}
      <div className="mb-14 overflow-hidden border-y border-sand py-3">
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{
            animation: 'marquee 28s linear infinite',
            width: 'max-content',
          }}
        >
          {marqueePhrases.map((phrase, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static array, order never changes
              key={i}
              className="font-ui text-[11px] text-mocha/60 uppercase tracking-[0.16em]"
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 font-ui text-[10px] font-semibold text-terracotta uppercase tracking-[0.2em]">
              Customer Stories
            </p>
            <h2 className="font-heading text-4xl text-espresso leading-tight lg:text-5xl">
              Loved Across Nepal
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm text-warm-gray leading-relaxed sm:text-right">
            Real stories from people who carry a piece of our craft with them.
          </p>
        </motion.div>

        {/* Staggered testimonial cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 sm:items-start">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.14, ease: 'easeOut' }}
              className={`relative flex flex-col gap-5 rounded-2xl p-7 ${cardOffsets[i]} bg-cream border border-sand`}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-7 h-0.5 w-12 rounded-full "
                style={{ backgroundColor: t.accentColor }}
              />

              {/* Decorative number */}
              <span
                className="absolute top-5 right-6 font-heading text-6xl leading-none select-none"
                style={{ color: t.accentColor, opacity: 0.18 }}
                aria-hidden="true"
              >
                {t.num}
              </span>

              {/* Stars */}
              <div className="flex gap-0.5 pt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill={star <= t.rating ? '#d4a447' : 'none'}
                    stroke="#d4a447"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="flex-1 font-heading text-[1.05rem] text-espresso/80 italic leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-sand pt-5">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-ui text-xs font-bold text-cream"
                  style={{ backgroundColor: t.accentColor }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-ui text-sm font-semibold text-espresso">{t.name}</p>
                  <p className="font-body text-[11px] text-warm-gray">
                    {t.location} · {t.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-20 grid grid-cols-3 divide-x divide-sand rounded-2xl border border-sand py-8 bg-cream"
        >
          {[
            { value: '4.9', label: 'Average Rating', suffix: '/ 5' },
            { value: '98%', label: 'Satisfaction Rate', suffix: '' },
            { value: '1.2K+', label: 'Happy Customers', suffix: '' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 px-4 text-center">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-4xl text-amber lg:text-5xl">{stat.value}</span>
                {stat.suffix && (
                  <span className="font-body text-sm text-warm-gray">{stat.suffix}</span>
                )}
              </div>
              <span className="font-ui text-[11px] text-warm-gray uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
