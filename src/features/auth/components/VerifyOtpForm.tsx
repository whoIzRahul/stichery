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
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    </div>
    <div>
      <blockquote className="font-heading text-4xl text-espresso leading-[1.1] tracking-tight lg:text-[2.8rem]">
        "One code, <em className="text-terracotta not-italic">one step</em> closer."
      </blockquote>
      <p className="mt-4 font-body text-sm text-warm-gray leading-relaxed">
        We sent a 6-digit verification code to your email. Enter it below to continue resetting your
        password.
      </p>
    </div>
    <div className="flex flex-col gap-2.5">
      {[
        'Code valid for 10 minutes',
        'Each code can only be used once',
        "Didn't receive it? Check spam",
      ].map((item) => (
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
      ))}
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
      <legend className="sr-only">OTP input</legend>
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

export function VerifyOtpForm() {
  const [otp, setOtp] = useState('      ');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resent, setResent] = useState(false);

  const filledDigits = otp.replace(/\s/g, '').length;
  const isComplete = filledDigits === OTP_LENGTH;
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
          <h2 className="font-heading text-2xl text-espresso">Code verified!</h2>
          <p className="mt-2 font-body text-sm text-warm-gray">
            Identity confirmed. You can now set a new password.
          </p>
          <Link
            href={AppPaths.auth.resetPassword}
            className="mt-6 inline-block w-full rounded-sm bg-terracotta py-3.5 text-center font-ui text-cream text-sm uppercase tracking-[0.12em] transition-colors hover:bg-mocha"
          >
            Set New Password
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
            Verify Code
          </span>
          <h1 className="mt-3 font-heading text-3xl text-espresso sm:text-4xl">Enter OTP</h1>
          <p className="mt-1.5 font-body text-sm text-warm-gray">
            Enter the 6-digit code sent to your email address.
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
              A new code has been sent to your email.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-sm bg-terracotta py-3.5 font-ui text-cream text-sm uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-mocha focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
          >
            Verify Code
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
            <Link
              href={AppPaths.auth.forgotPassword}
              className="text-terracotta underline-offset-2 hover:underline"
            >
              ← Use a different email
            </Link>
          </p>
        </form>
      </div>
    </AuthSplitLayout>
  );
}
