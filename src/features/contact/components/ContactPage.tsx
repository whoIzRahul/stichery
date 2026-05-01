'use client';
import { useState } from 'react';

type Fields = {
  name: string;
  subject: string;
  email: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof Fields, string>>;

const MESSAGE_MAX = 500;

function validate(values: Fields): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Your name is required';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!values.subject.trim()) {
    errors.subject = 'A subject is required';
  } else if (values.subject.trim().length < 4) {
    errors.subject = 'Subject must be at least 4 characters';
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.message.trim()) {
    errors.message = 'A message is required';
  } else if (values.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters';
  } else if (values.message.length > MESSAGE_MAX) {
    errors.message = `Message must be at most ${MESSAGE_MAX} characters`;
  }

  return errors;
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1 font-body text-red-500 text-xs dark:text-red-400"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      {message}
    </p>
  );
}

function FieldWrapper({
  id,
  label,
  error,
  touched,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  touched: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-ui text-espresso text-xs font-semibold uppercase tracking-[0.1em] dark:text-espresso"
        >
          {label}
        </label>
        {optional && <span className="font-body text-warm-gray text-[10px]">optional</span>}
      </div>
      {children}
      {touched && error && <FieldError id={`${id}-error`} message={error} />}
    </div>
  );
}

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
        const cx = 200 + 148 * Math.cos(rad);
        const cy = 200 + 148 * Math.sin(rad);
        return <circle key={`dot-${deg}`} cx={cx} cy={cy} r="3.5" fill="currentColor" />;
      })}
      <circle cx="200" cy="200" r="10" fill="currentColor" />
    </svg>
  );
}

const contactDetails = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'hello@stitchery.np',
    sub: 'We reply within 24 hours',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+977 98-0000-0000',
    sub: 'Sun – Fri, 10 AM – 6 PM NPT',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'Thamel, Kathmandu',
    sub: 'Bagmati Province, Nepal',
  },
];

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-1 items-center justify-center px-5 py-20">
      <div className="w-full max-w-md rounded-2xl border border-sand bg-cream px-10 py-14 text-center shadow-sm dark:border-sand/20 dark:bg-linen">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage/15 dark:bg-sage/10">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-sage"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-heading text-3xl text-espresso">Message sent!</h2>
        <p className="mt-3 font-body text-sm text-warm-gray leading-relaxed">
          Thank you for reaching out. We'll get back to you at your email within 24 hours.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-8 inline-flex items-center gap-2 rounded-sm border border-terracotta px-6 py-3 font-ui text-terracotta text-sm uppercase tracking-[0.1em] transition-colors hover:bg-terracotta hover:text-cream"
        >
          Send another message
        </button>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [values, setValues] = useState<Fields>({
    name: '',
    subject: '',
    email: '',
    message: '',
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values);
  const hasErrors = Object.keys(errors).length > 0;

  const inputBase =
    'w-full rounded-sm border bg-cream px-4 py-3 font-body text-sm text-espresso placeholder:text-warm-gray/50 outline-none transition-all duration-200 focus:ring-2 dark:bg-linen dark:text-espresso dark:placeholder:text-warm-gray/40';

  function inputClass(field: keyof Fields) {
    const isError = touched[field] && errors[field];
    const isValid = touched[field] && !errors[field] && values[field];
    if (isError)
      return `${inputBase} border-red-400 focus:border-red-400 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900/40`;
    if (isValid) return `${inputBase} border-sage focus:border-sage focus:ring-sage/20`;
    return `${inputBase} border-sand focus:border-terracotta focus:ring-terracotta/15 dark:border-sand/40 dark:focus:border-terracotta`;
  }

  function handleChange(field: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleBlur(field: keyof Fields) {
    return () => setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, subject: true, email: true, message: true });
    if (hasErrors) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SuccessScreen
        onReset={() => {
          setSubmitted(false);
          setValues({ name: '', subject: '', email: '', message: '' });
          setTouched({});
        }}
      />
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-linen py-14 dark:bg-linen sm:py-20">
        {/* Dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#8b5e52_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.05]"
          aria-hidden="true"
        />
        {/* Mandala decoration */}
        <div
          className="pointer-events-none absolute -top-10 right-0 w-56 translate-x-1/3 text-terracotta opacity-[0.09] sm:w-80 dark:opacity-[0.06]"
          aria-hidden="true"
        >
          <CrochetMandala />
        </div>
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 w-48 text-mocha opacity-[0.07] sm:w-64 dark:opacity-[0.05]"
          aria-hidden="true"
        >
          <CrochetMandala />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose/25 bg-rose/10 px-3 py-1 font-ui text-mocha text-xs tracking-wide">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-terracotta" />
              We'd love to hear from you
            </span>
            <h1 className="mt-4 font-heading text-4xl text-espresso leading-tight sm:text-5xl lg:text-6xl">
              Get in <em className="text-terracotta not-italic">Touch</em>
            </h1>
            <p className="mt-4 max-w-md font-body text-base text-warm-gray leading-relaxed">
              Have a question about a custom order, need help with your purchase, or just want to
              say hello? We're here for it all.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="flex-1 bg-cream dark:bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:gap-24">
            {/* ── Form ── */}
            <div>
              <div className="mb-8">
                <h2 className="font-heading text-2xl text-espresso sm:text-3xl">
                  Send us a message
                </h2>
                <p className="mt-1 font-body text-sm text-warm-gray">
                  Fill in the form below and we'll respond as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Name + Subject row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <FieldWrapper
                    id="name"
                    label="Your Name"
                    error={errors.name}
                    touched={!!touched.name}
                  >
                    <input
                      id="name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Sita Karmacharya"
                      value={values.name}
                      onChange={handleChange('name')}
                      onBlur={handleBlur('name')}
                      aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                      className={inputClass('name')}
                    />
                  </FieldWrapper>

                  <FieldWrapper
                    id="subject"
                    label="Subject"
                    error={errors.subject}
                    touched={!!touched.subject}
                  >
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="Custom order enquiry"
                      value={values.subject}
                      onChange={handleChange('subject')}
                      onBlur={handleBlur('subject')}
                      aria-describedby={
                        touched.subject && errors.subject ? 'subject-error' : undefined
                      }
                      className={inputClass('subject')}
                    />
                  </FieldWrapper>
                </div>

                {/* Email */}
                <FieldWrapper
                  id="email"
                  label="Email Address"
                  error={errors.email}
                  touched={!!touched.email}
                >
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="sita@example.com"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    className={inputClass('email')}
                  />
                </FieldWrapper>

                {/* Message */}
                <FieldWrapper
                  id="message"
                  label="Message"
                  error={errors.message}
                  touched={!!touched.message}
                >
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us what you need — a custom flower bouquet, a bulk order, a gift idea…"
                      value={values.message}
                      onChange={handleChange('message')}
                      onBlur={handleBlur('message')}
                      maxLength={MESSAGE_MAX}
                      aria-describedby={
                        touched.message && errors.message ? 'message-error' : undefined
                      }
                      className={`${inputClass('message')} resize-none`}
                    />
                    <span
                      className={`absolute right-3 bottom-2.5 font-mono text-[10px] tabular-nums transition-colors ${
                        values.message.length > MESSAGE_MAX * 0.9
                          ? 'text-terracotta'
                          : 'text-warm-gray/50'
                      }`}
                    >
                      {values.message.length}/{MESSAGE_MAX}
                    </span>
                  </div>
                </FieldWrapper>

                <button
                  type="submit"
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-terracotta py-4 font-ui text-cream text-sm uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-mocha focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 sm:w-auto sm:px-12"
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
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Message
                </button>
              </form>
            </div>

            {/* ── Contact info sidebar ── */}
            <aside>
              <div className="sticky top-24">
                <div className="mb-8">
                  <h2 className="font-heading text-2xl text-espresso sm:text-3xl">Contact info</h2>
                  <p className="mt-1 font-body text-sm text-warm-gray">
                    Prefer a direct reach? Here's where to find us.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {contactDetails.map(({ icon, label, value, sub }) => (
                    <div
                      key={label}
                      className="group flex items-start gap-4 rounded-lg border border-sand bg-linen/60 p-5 transition-all duration-200 hover:border-rose/40 hover:shadow-sm dark:border-sand/20 dark:bg-linen/40 dark:hover:border-rose/20"
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose/15 text-terracotta transition-colors group-hover:bg-rose/25 dark:bg-rose/10">
                        {icon}
                      </div>
                      <div>
                        <p className="font-ui text-espresso text-[10px] font-semibold uppercase tracking-widest">
                          {label}
                        </p>
                        <p className="mt-0.5 font-body text-espresso text-sm font-medium">
                          {value}
                        </p>
                        <p className="mt-0.5 font-body text-warm-gray text-xs">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative divider */}
                <div className="my-8 flex items-center gap-3" aria-hidden="true">
                  <div className="flex-1 border-t border-sand dark:border-sand/30" />
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="inline-block h-1.5 w-1.5 rounded-full bg-sand dark:bg-sand/40"
                      />
                    ))}
                  </div>
                  <div className="flex-1 border-t border-sand dark:border-sand/30" />
                </div>

                {/* Hours card */}
                <div className="rounded-lg border border-amber/25 bg-amber/5 p-5 dark:border-amber/15 dark:bg-amber/[0.04]">
                  <div className="mb-3 flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-amber"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="font-ui text-espresso text-xs font-semibold uppercase tracking-widest">
                      Business Hours
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1.5 font-body text-xs text-warm-gray">
                    <li className="flex justify-between">
                      <span>Sunday – Friday</span>
                      <span className="font-medium text-espresso">10:00 AM – 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium text-espresso">Closed</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Public Holidays</span>
                      <span className="font-medium text-espresso">Closed</span>
                    </li>
                  </ul>
                  <p className="mt-3 font-body text-[10px] text-warm-gray/70">
                    All times in Nepal Standard Time (NPT, UTC+5:45)
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
