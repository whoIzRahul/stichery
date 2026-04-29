'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';

type FieldErrors = {
  email?: string;
  password?: string;
};

function validate(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
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
  children,
  labelRight,
}: {
  id: string;
  label: string;
  error?: string;
  touched: boolean;
  children: React.ReactNode;
  labelRight?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-ui text-espresso text-xs font-medium uppercase tracking-[0.1em]"
        >
          {label}
        </label>
        {labelRight}
      </div>
      {children}
      {touched && error && <FieldError id={`${id}-error`} message={error} />}
    </div>
  );
}

const testimonials = [
  {
    quote: 'The quality is absolutely stunning. I can feel the love in every stitch.',
    name: 'Sita Karmacharya',
    location: 'Kathmandu',
  },
  {
    quote: 'Gifted a crochet flower bouquet to my mother — she was in tears. Perfect.',
    name: 'Anita Thapa',
    location: 'Pokhara',
  },
  {
    quote: 'Fast delivery and even faster to fall in love with every product.',
    name: 'Rajan Shrestha',
    location: 'Lalitpur',
  },
];

function AuthLeftPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-linen px-12 py-14 dark:bg-linen md:flex md:w-[44%] lg:w-[46%]">
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#8b5e52_1px,transparent_1px)] bg-size-[28px_28px] opacity-[0.06] dark:opacity-[0.04]"
        aria-hidden="true"
      />

      {/* Crochet mandala */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 opacity-[0.12] dark:opacity-[0.07]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" width="480" height="480" fill="none" aria-hidden="true">
          <circle cx="200" cy="200" r="190" stroke="#c1644f" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="148" stroke="#c1644f" strokeWidth="1" />
          <circle cx="200" cy="200" r="106" stroke="#c1644f" strokeWidth="1" />
          <circle cx="200" cy="200" r="64" stroke="#c1644f" strokeWidth="1" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={200 + 12 * Math.cos(rad)}
                y1={200 + 12 * Math.sin(rad)}
                x2={200 + 190 * Math.cos(rad)}
                y2={200 + 190 * Math.sin(rad)}
                stroke="#c1644f"
                strokeWidth="0.8"
              />
            );
          })}
          <circle cx="200" cy="200" r="12" stroke="#c1644f" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Brand mark */}
      <div className="relative z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 240 240"
          width="40"
          height="40"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="#8b5e52"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="80" cy="70" rx="34" ry="22" transform="rotate(-22 80 70)" />
            <ellipse cx="120" cy="120" rx="34" ry="22" />
            <ellipse cx="160" cy="170" rx="34" ry="22" transform="rotate(-22 160 170)" />
          </g>
          <circle cx="190" cy="190" r="9" fill="#c1644f" />
        </svg>
        <p className="mt-2 font-ui text-mocha text-xs uppercase tracking-[0.18em]">Stitchery</p>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[340px]">
        <blockquote className="font-heading text-4xl text-espresso leading-[1.1] tracking-tight lg:text-[2.8rem]">
          "Handmade with <em className="text-terracotta not-italic">heart,</em>
          <br />
          made for you."
        </blockquote>
        <p className="mt-4 font-body text-sm text-warm-gray leading-relaxed">
          Your account gives you access to order history, wishlists, and exclusive early access to
          new collections.
        </p>

        {/* Testimonials */}
        <div className="mt-8 flex flex-col gap-4">
          {testimonials.map(({ quote, name, location }) => (
            <div
              key={name}
              className="rounded-sm border border-sand/60 bg-cream/60 px-4 py-3 dark:border-sand/30 dark:bg-espresso/5"
            >
              <p className="font-body text-espresso text-xs leading-relaxed">"{quote}"</p>
              <p className="mt-1.5 font-ui text-warm-gray text-[10px] uppercase tracking-wide">
                — {name}, {location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 font-ui text-warm-gray text-xs">
        © {new Date().getFullYear()} Stitchery — Kathmandu, Nepal
      </p>
    </div>
  );
}

export function LoginForm() {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [values, setValues] = useState({ email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values.email, values.password);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleBlur(field: string) {
    return () => setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (hasErrors) return;
    setSubmitted(true);
  }

  const inputBase =
    'w-full rounded-sm border bg-cream px-4 py-3 font-body text-sm text-espresso placeholder:text-warm-gray/60 outline-none transition-all duration-200 focus:ring-2 dark:bg-linen dark:text-espresso dark:placeholder:text-warm-gray/50';

  function inputClass(field: keyof typeof values) {
    const isError = touched[field] && errors[field];
    const isValid = touched[field] && !errors[field] && values[field];
    if (isError)
      return `${inputBase} border-red-400 focus:border-red-400 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900/40`;
    if (isValid) return `${inputBase} border-sage focus:border-sage focus:ring-sage/20`;
    return `${inputBase} border-sand focus:border-terracotta focus:ring-terracotta/15 dark:border-sand/50 dark:focus:border-terracotta`;
  }

  if (submitted) {
    return (
      <section className="flex flex-1">
        <AuthLeftPanel />
        <div className="flex flex-1 items-center justify-center px-5 py-16 sm:px-10">
          <div className="w-full max-w-md rounded-lg border border-sand bg-cream p-10 text-center shadow-sm dark:border-sand/30 dark:bg-linen">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sage/20 dark:bg-sage/10">
              <svg
                width="28"
                height="28"
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
            <h2 className="font-heading text-2xl text-espresso">Welcome back!</h2>
            <p className="mt-2 font-body text-sm text-warm-gray">
              You've successfully signed in. Redirecting you to your account…
            </p>
            <Link
              href={AppPaths.home}
              className="mt-6 inline-block rounded-sm bg-terracotta px-6 py-3 font-ui text-cream text-sm uppercase tracking-[0.1em] transition-colors hover:bg-mocha"
            >
              Go to Shop
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-1">
      <AuthLeftPanel />

      {/* Right — form */}
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose/20 bg-rose/10 px-3 py-1 font-ui text-mocha text-xs tracking-wide">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-terracotta" />
              Welcome Back
            </span>
            <h1 className="mt-3 font-heading text-3xl text-espresso sm:text-4xl">Sign in</h1>
            <p className="mt-1.5 font-body text-sm text-warm-gray">
              Don't have an account?{' '}
              <Link
                href={AppPaths.auth.register}
                className="font-medium text-terracotta underline-offset-2 hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 mb-5">
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
                placeholder="priya@example.com"
                value={values.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                className={inputClass('email')}
              />
            </FieldWrapper>

            {/* Password */}
            <FieldWrapper
              id="password"
              label="Password"
              error={errors.password}
              touched={!!touched.password}
              labelRight={
                <Link
                  href={AppPaths.auth.forgotPassword}
                  className="font-body text-terracotta text-xs underline-offset-2 hover:underline"
                >
                  Forgot password?
                </Link>
              }
            >
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Your password"
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  aria-describedby={
                    touched.password && errors.password ? 'password-error' : undefined
                  }
                  className={`${inputClass('password')} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-warm-gray transition-colors hover:text-espresso"
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
            </FieldWrapper>

            {/* Remember me */}
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-terracotta"
              />
              <span className="font-body text-espresso text-sm">Remember me for 30 days</span>
            </label>

            <button
              type="submit"
              className="mt-1 w-full rounded-sm bg-terracotta py-3.5 font-ui text-cream text-sm uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-mocha focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="mb-5 flex items-center gap-3" aria-hidden="true">
            <div className="flex-1 border-t border-sand dark:border-sand/40" />
            <span className="font-ui text-warm-gray text-xs uppercase tracking-widest">or</span>
            <div className="flex-1 border-t border-sand dark:border-sand/40" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-sm border border-sand bg-cream py-3 font-body text-espresso text-sm transition-colors hover:bg-linen dark:border-sand/40 dark:bg-linen dark:hover:bg-sand/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 font-body text-warm-gray text-xs">
            By signing in you agree to our{' '}
            <Link href="#" className="text-terracotta underline-offset-2 hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-terracotta underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
