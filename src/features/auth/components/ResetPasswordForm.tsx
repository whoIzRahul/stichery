'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { AuthSplitLayout } from './AuthSplitLayout';

type FieldErrors = {
  password?: string;
  confirm?: string;
};

function validate(password: string, confirm: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!password) {
    errors.password = 'New password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'Include at least one uppercase letter';
  } else if (!/[0-9]/.test(password)) {
    errors.password = 'Include at least one number';
  }

  if (!confirm) {
    errors.confirm = 'Please confirm your password';
  } else if (password && confirm !== password) {
    errors.confirm = 'Passwords do not match';
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

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const label = ['Weak', 'Fair', 'Good', 'Strong'][score - 1] ?? 'Weak';
  const colors = ['bg-red-400', 'bg-amber', 'bg-sage', 'bg-sage'];
  const color = colors[score - 1] ?? 'bg-red-400';

  return (
    <div className="mt-1.5 flex items-center gap-2" aria-live="polite" aria-atomic="true">
      <div className="flex flex-1 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < score ? color : 'bg-sand dark:bg-sand/40'}`}
          />
        ))}
      </div>
      <span className="min-w-9 text-right font-ui text-warm-gray text-xs">{label}</span>
    </div>
  );
}

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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    </div>
    <div>
      <blockquote className="font-heading text-4xl text-espresso leading-[1.1] tracking-tight lg:text-[2.8rem]">
        "A fresh start, <em className="text-terracotta not-italic">secured.</em>"
      </blockquote>
      <p className="mt-4 font-body text-sm text-warm-gray leading-relaxed">
        Create a strong new password for your Stitchery account. Make it unique and hard to guess.
      </p>
    </div>
    <div className="flex flex-col gap-2.5">
      {['At least 8 characters', 'Mix uppercase & numbers', 'Never share your password'].map(
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

export function ResetPasswordForm() {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [values, setValues] = useState({ password: '', confirm: '' });
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values.password, values.confirm);

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
    setTouched({ password: true, confirm: true });
    if (Object.keys(errors).length > 0) return;
    setSubmitted(true);
  }

  const inputBase =
    'w-full rounded-sm border bg-cream px-4 py-3 font-body text-sm text-espresso placeholder:text-warm-gray/60 outline-none transition-all duration-200 focus:ring-2 dark:bg-linen dark:text-espresso';

  function inputClass(field: keyof typeof values) {
    const isError = touched[field] && errors[field];
    const isValid = touched[field] && !errors[field] && values[field];
    if (isError)
      return `${inputBase} border-red-400 focus:border-red-400 focus:ring-red-200 dark:border-red-500`;
    if (isValid) return `${inputBase} border-sage focus:border-sage focus:ring-sage/20`;
    return `${inputBase} border-sand focus:border-terracotta focus:ring-terracotta/15 dark:border-sand/50`;
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
          <h2 className="font-heading text-2xl text-espresso">Password updated!</h2>
          <p className="mt-2 font-body text-sm text-warm-gray">
            Your password has been reset. You can now sign in with your new password.
          </p>
          <Link
            href={AppPaths.auth.login}
            className="mt-6 inline-block w-full rounded-sm bg-terracotta py-3.5 text-center font-ui text-cream text-sm uppercase tracking-[0.12em] transition-colors hover:bg-mocha"
          >
            Sign In
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
            New Password
          </span>
          <h1 className="mt-3 font-heading text-3xl text-espresso sm:text-4xl">Reset password</h1>
          <p className="mt-1.5 font-body text-sm text-warm-gray">
            Choose a strong new password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* New password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-ui text-espresso text-xs font-medium uppercase tracking-widest"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                value={values.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                aria-describedby={
                  touched.password && errors.password ? 'password-error' : undefined
                }
                aria-invalid={touched.password && !!errors.password}
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
            <PasswordStrength password={values.password} />
            {touched.password && errors.password && (
              <p
                id="password-error"
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
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirm"
              className="font-ui text-espresso text-xs font-medium uppercase tracking-widest"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                name="confirm"
                autoComplete="new-password"
                placeholder="Repeat your new password"
                value={values.confirm}
                onChange={handleChange('confirm')}
                onBlur={handleBlur('confirm')}
                aria-describedby={touched.confirm && errors.confirm ? 'confirm-error' : undefined}
                aria-invalid={touched.confirm && !!errors.confirm}
                className={`${inputClass('confirm')} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 text-warm-gray transition-colors hover:text-espresso"
              >
                <EyeIcon visible={showConfirm} />
              </button>
            </div>
            {touched.confirm && errors.confirm && (
              <p
                id="confirm-error"
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
                {errors.confirm}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-1 w-full rounded-sm bg-terracotta py-3.5 font-ui text-cream text-sm uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-mocha focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
          >
            Update Password
          </button>
        </form>
      </div>
    </AuthSplitLayout>
  );
}
