'use client';
import { useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { AuthSplitLayout } from './AuthSplitLayout';

const OTP_LENGTH = 6;

const leftContent = (
  <div className="flex flex-col gap-6">
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-terracotta/20 bg-terracotta/10">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-terracotta"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.93 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.88 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    </div>
    <div>
      <blockquote className="font-heading text-4xl text-espresso leading-[1.1] tracking-tight lg:text-[2.8rem]">
        "Your account, <em className="text-terracotta not-italic">verified.</em>"
      </blockquote>
      <p className="mt-4 font-body text-sm text-warm-gray leading-relaxed">
        We sent a 6-digit code to the email address you registered with. Enter it below to activate
        your account.
      </p>
    </div>
    <div className="rounded-sm border border-sand/60 bg-cream/60 px-4 py-4 dark:border-sand/30 dark:bg-espresso/5">
      <p className="font-ui text-warm-gray text-[11px] uppercase tracking-wide">Why verify?</p>
      <p className="mt-1.5 font-body text-espresso text-xs leading-relaxed">
        Email verification keeps your account secure and ensures you receive order updates, shipping
        notifications, and receipts.
      </p>
    </div>
  </div>
);

function OtpInput({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (val: string) => void;
  hasError: boolean;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function handleChange(index: number, inputValue: string) {
    const digit = inputValue.replace(/\D/g, '').slice(-1);
    const chars = `${value}      `.slice(0, OTP_LENGTH).split('');
    chars[index] = digit;
    const next = chars.join('');
    onChange(next);
    if (digit && index < OTP_LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      const chars = `${value}      `.slice(0, OTP_LENGTH).split('');
      if (chars[index]?.trim()) {
        chars[index] = ' ';
        onChange(chars.join(''));
      } else if (index > 0) {
        refs.current[index - 1]?.focus();
      }
    }
    if (e.key === 'ArrowLeft' && index > 0) refs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) refs.current[index + 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (pasted) {
      onChange(pasted.padEnd(OTP_LENGTH, ' '));
      const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
      refs.current[focusIndex]?.focus();
    }
  }

  const baseCell =
    'h-14 w-11 rounded-sm border text-center font-heading text-xl text-espresso caret-terracotta outline-none transition-all duration-150 focus:ring-2 dark:bg-linen dark:text-espresso sm:h-16 sm:w-13';

  return (
    <fieldset className="m-0 flex justify-center gap-2 border-none p-0 sm:gap-3">
      <legend className="sr-only">Email verification code</legend>
      {Array.from({ length: OTP_LENGTH }).map((_, i) => (
        <input
          // biome-ignore lint/suspicious/noArrayIndexKey: OTP inputs are positional by design
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          value={value[i]?.trim() ?? ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
          className={
            hasError
              ? `${baseCell} border-red-400 focus:border-red-400 focus:ring-red-200 dark:border-red-500`
              : value[i]?.trim()
                ? `${baseCell} border-terracotta bg-terracotta/5 focus:ring-terracotta/20`
                : `${baseCell} border-sand focus:border-terracotta focus:ring-terracotta/15 dark:border-sand/50`
          }
        />
      ))}
    </fieldset>
  );
}

export function VerifyEmailForm() {
  const [otp, setOtp] = useState('      ');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resent, setResent] = useState(false);

  const isComplete = otp.replace(/\s/g, '').length === OTP_LENGTH;
  const hasError = touched && !isComplete;

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setTouched(true);
    if (!isComplete) return;
    setSubmitted(true);
  }

  function handleResend() {
    setOtp('      ');
    setTouched(false);
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  }

  if (submitted) {
    return (
      <AuthSplitLayout leftContent={leftContent}>
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
          <h2 className="font-heading text-2xl text-espresso">Email verified!</h2>
          <p className="mt-2 font-body text-sm text-warm-gray">
            Your account is now active. Welcome to Stitchery!
          </p>
          <Link
            href={AppPaths.home}
            className="mt-6 inline-block w-full rounded-sm bg-terracotta py-3.5 text-center font-ui text-cream text-sm uppercase tracking-[0.12em] transition-colors hover:bg-mocha"
          >
            Start Shopping
          </Link>
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
            Verify Email
          </span>
          <h1 className="mt-3 font-heading text-3xl text-espresso sm:text-4xl">
            Verify your email
          </h1>
          <p className="mt-1.5 font-body text-sm text-warm-gray">
            Enter the 6-digit code we sent to your email address.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          <OtpInput value={otp} onChange={setOtp} hasError={hasError} />

          {hasError && (
            <p
              role="alert"
              className="text-center font-body text-red-500 text-xs dark:text-red-400"
            >
              Please enter all 6 digits.
            </p>
          )}

          {resent && (
            <p aria-live="polite" className="text-center font-body text-sage text-xs">
              A new verification code has been sent.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-sm bg-terracotta py-3.5 font-ui text-cream text-sm uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-mocha focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
          >
            Verify Email
          </button>

          <p className="text-center font-body text-warm-gray text-sm">
            Didn't receive a code?{' '}
            <button
              type="button"
              onClick={handleResend}
              className="font-medium text-terracotta underline-offset-2 hover:underline"
            >
              Resend
            </button>
          </p>

          <p className="text-center font-body text-warm-gray text-xs">
            Wrong email?{' '}
            <Link
              href={AppPaths.auth.register}
              className="text-terracotta underline-offset-2 hover:underline"
            >
              Back to register
            </Link>
          </p>
        </form>
      </div>
    </AuthSplitLayout>
  );
}
