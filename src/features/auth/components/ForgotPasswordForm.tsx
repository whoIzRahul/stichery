'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { AuthSplitLayout } from './AuthSplitLayout';

function MailIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-terracotta"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const leftContent = (
  <div className="flex flex-col gap-6">
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-terracotta/20 bg-terracotta/10">
      <MailIcon />
    </div>
    <div>
      <blockquote className="font-heading text-4xl text-espresso leading-[1.1] tracking-tight lg:text-[2.8rem]">
        "Forgotten passwords, <em className="text-terracotta not-italic">quickly</em> solved."
      </blockquote>
      <p className="mt-4 font-body text-sm text-warm-gray leading-relaxed">
        Enter the email address linked to your account and we'll send you a 6-digit code to reset
        your password.
      </p>
    </div>
    <div className="flex flex-col gap-2.5">
      {['Check your spam folder too', 'Code expires in 10 minutes', 'Secure one-time use only'].map(
        (item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sage/30">
              <svg
                width="9"
                height="9"
                viewBox="0 0 12 12"
                fill="none"
                stroke="#6b9464"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="2 6 5 9 10 3" />
              </svg>
            </span>
            <span className="font-body text-warm-gray text-xs">{item}</span>
          </div>
        ),
      )}
    </div>
  </div>
);

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const error = !email.trim()
    ? 'Email address is required'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ? 'Enter a valid email address'
      : undefined;

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setTouched(true);
    if (error) return;
    setSubmitted(true);
  }

  const inputBase =
    'w-full rounded-sm border bg-cream px-4 py-3 font-body text-sm text-espresso placeholder:text-warm-gray/60 outline-none transition-all duration-200 focus:ring-2 dark:bg-linen dark:text-espresso';

  const inputClass =
    touched && error
      ? `${inputBase} border-red-400 focus:border-red-400 focus:ring-red-200 dark:border-red-500`
      : touched && !error
        ? `${inputBase} border-sage focus:border-sage focus:ring-sage/20`
        : `${inputBase} border-sand focus:border-terracotta focus:ring-terracotta/15 dark:border-sand/50`;

  if (submitted) {
    return (
      <AuthSplitLayout leftContent={leftContent}>
        <div className="w-full max-w-md rounded-lg border border-sand bg-cream p-10 text-center shadow-sm dark:border-sand/30 dark:bg-linen">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-terracotta/10">
            <MailIcon />
          </div>
          <h2 className="font-heading text-2xl text-espresso">Check your inbox</h2>
          <p className="mt-2 font-body text-sm text-warm-gray">
            We sent a 6-digit code to <span className="font-medium text-espresso">{email}</span>. It
            expires in 10 minutes.
          </p>
          <Link
            href={AppPaths.auth.verifyOtp}
            className="mt-6 inline-block w-full rounded-sm bg-terracotta py-3.5 text-center font-ui text-cream text-sm uppercase tracking-[0.12em] transition-colors hover:bg-mocha"
          >
            Enter Code
          </Link>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-3 w-full rounded-sm border border-sand py-3 font-ui text-espresso text-sm uppercase tracking-[0.1em] transition-colors hover:bg-linen dark:border-sand/40"
          >
            Use a different email
          </button>
        </div>
      </AuthSplitLayout>
    );
  }

  return (
    <AuthSplitLayout leftContent={leftContent}>
      <div className="w-full max-w-105">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose/20 bg-rose/10 px-3 py-1 font-ui text-mocha text-xs tracking-wide">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-terracotta" />
            Password Reset
          </span>
          <h1 className="mt-3 font-heading text-3xl text-espresso sm:text-4xl">Forgot password?</h1>
          <p className="mt-1.5 font-body text-sm text-warm-gray">
            Remember it?{' '}
            <Link
              href={AppPaths.auth.login}
              className="font-medium text-terracotta underline-offset-2 hover:underline"
            >
              Back to sign in
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-ui text-espresso text-xs font-medium uppercase tracking-widest"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="priya@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-describedby={touched && error ? 'email-error' : undefined}
              aria-invalid={touched && !!error}
              className={inputClass}
            />
            {touched && error && (
              <p
                id="email-error"
                role="alert"
                className="flex items-center gap-1 font-body text-red-500 text-xs dark:text-red-400"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-sm bg-terracotta py-3.5 font-ui text-cream text-sm uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-mocha focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
          >
            Send Reset Code
          </button>
        </form>
      </div>
    </AuthSplitLayout>
  );
}
