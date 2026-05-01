'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { ProfileSidebar } from './ProfileSidebar';

/* ─── Types ───────────────────────────────────────────────────────────────── */
interface Fields {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
type FieldErrors = Partial<Record<keyof Fields, string>>;
type Touched = Partial<Record<keyof Fields, boolean>>;
type Status = 'idle' | 'success' | 'error';

/* ─── Validation ──────────────────────────────────────────────────────────── */
const PASSWORD_MIN = 8;

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};

  if (!fields.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }

  if (!fields.newPassword) {
    errors.newPassword = 'New password is required';
  } else if (fields.newPassword.length < PASSWORD_MIN) {
    errors.newPassword = `Password must be at least ${PASSWORD_MIN} characters`;
  } else if (!/[A-Z]/.test(fields.newPassword)) {
    errors.newPassword = 'Include at least one uppercase letter';
  } else if (!/[0-9]/.test(fields.newPassword)) {
    errors.newPassword = 'Include at least one number';
  } else if (fields.newPassword === fields.currentPassword) {
    errors.newPassword = 'New password must differ from current password';
  }

  if (!fields.confirmPassword) {
    errors.confirmPassword = 'Please confirm your new password';
  } else if (fields.confirmPassword !== fields.newPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

/* ─── Password strength ───────────────────────────────────────────────────── */
function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak', color: 'bg-red-400' };
  if (score <= 2) return { score, label: 'Fair', color: 'bg-amber' };
  if (score <= 3) return { score, label: 'Good', color: 'bg-sage' };
  return { score, label: 'Strong', color: 'bg-sage' };
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */
function FieldError({ message }: { message: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="mt-1.5 flex items-center gap-1 font-body text-xs text-red-500 dark:text-red-400"
      role="alert"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      {message}
    </motion.p>
  );
}

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  autoComplete?: string;
  showStrength?: boolean;
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  showStrength,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const strength = showStrength ? getStrength(value) : null;

  return (
    <div className="flex flex-col gap-0">
      <div className="relative">
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-0 top-0 origin-top-left font-ui text-sm transition-all duration-200 ${
            value.length > 0
              ? '-translate-y-5 scale-[0.82] text-terracotta'
              : 'translate-y-3 scale-100 text-warm-gray'
          }`}
        >
          {label}
        </label>
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full border-b bg-transparent pb-2.5 pr-10 pt-6 font-body text-sm text-espresso outline-none transition-colors duration-200 focus:border-terracotta ${
            error ? 'border-red-400' : 'border-sand dark:border-sand/30'
          }`}
        />
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-0 bottom-2.5 p-0.5 text-warm-gray/60 transition-colors hover:text-espresso"
          tabIndex={-1}
        >
          {visible ? (
            <svg
              width="15"
              height="15"
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
              width="15"
              height="15"
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
          )}
        </button>
      </div>

      {showStrength && value.length > 0 && strength && (
        <div className="mt-2 flex items-center gap-2">
          <div className="flex flex-1 gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                  strength.score >= i ? strength.color : 'bg-sand'
                }`}
              />
            ))}
          </div>
          <span className="font-ui text-[10px] text-warm-gray/70">{strength.label}</span>
        </div>
      )}

      {error && <FieldError message={error} />}
    </div>
  );
}

/* ─── Password requirements checklist ────────────────────────────────────── */
function Requirements({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character (optional)', met: /[^A-Za-z0-9]/.test(password) },
  ];

  if (!password) return null;

  return (
    <motion.ul
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-3 flex flex-col gap-1.5 overflow-hidden"
    >
      {checks.map(({ label, met }) => (
        <li key={label} className="flex items-center gap-2">
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
              met ? 'bg-sage' : 'bg-sand'
            }`}
          >
            {met ? (
              <svg
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <span className="h-1 w-1 rounded-full bg-warm-gray/40" />
            )}
          </span>
          <span
            className={`font-ui text-[11px] transition-colors duration-200 ${met ? 'text-espresso' : 'text-warm-gray/60'}`}
          >
            {label}
          </span>
        </li>
      ))}
    </motion.ul>
  );
}

/* ─── Main page ───────────────────────────────────────────────────────────── */
export function SecurityPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [fields, setFields] = useState<Fields>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState<Touched>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const errors = validate(fields);
  const visibleErrors: FieldErrors = {};
  for (const key of Object.keys(errors) as (keyof Fields)[]) {
    if (touched[key] || submitted) visibleErrors[key] = errors[key];
  }

  function set(field: keyof Fields) {
    return (value: string) => {
      setFields((prev) => ({ ...prev, [field]: value }));
      if (status !== 'idle') setStatus('idle');
    };
  }
  function touch(field: keyof Fields) {
    return () => setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTouched({ currentPassword: true, newPassword: true, confirmPassword: true });
    if (Object.keys(errors).length > 0) return;
    setStatus('success');
    setFields({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTouched({});
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-cream">
      {/* Breadcrumb strip */}
      <div className="border-b border-sand bg-linen/60 dark:border-sand/20 dark:bg-linen/10">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            aria-label="Open account menu"
            onClick={() => setMobileSidebarOpen(true)}
            className="mr-1 flex h-7 w-7 items-center justify-center rounded-md text-warm-gray hover:bg-sand hover:text-espresso lg:hidden"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="14" x2="16" y2="14" />
            </svg>
          </button>
          <Link
            href={AppPaths.dashboard.profile}
            className="font-ui text-xs text-warm-gray transition-colors hover:text-terracotta"
          >
            Dashboard
          </Link>
          <span className="font-ui text-xs text-warm-gray/40">›</span>
          <span className="font-ui text-xs text-espresso">Security</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <div className="sticky top-24">
              <ProfileSidebar />
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h1 className="font-heading text-3xl font-medium text-espresso">Security</h1>
              <p className="mt-1 font-body text-sm text-warm-gray">
                Update your password to keep your account secure.
              </p>
            </motion.div>

            {/* Change password card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="max-w-lg rounded-2xl border border-sand bg-white/60 p-6 shadow-sm dark:border-sand/20 dark:bg-sand/5 sm:p-8"
            >
              {/* Card header */}
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <div>
                  <h2 className="font-heading text-base font-medium text-espresso">
                    Change Password
                  </h2>
                  <p className="font-body text-xs text-warm-gray">
                    Choose a strong, unique password.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
                {/* Current password */}
                <PasswordField
                  id="currentPassword"
                  label="Current Password *"
                  value={fields.currentPassword}
                  onChange={set('currentPassword')}
                  onBlur={touch('currentPassword')}
                  error={visibleErrors.currentPassword}
                  autoComplete="current-password"
                />

                {/* Divider */}
                <div className="border-t border-sand dark:border-sand/25" />

                {/* New password + strength */}
                <div>
                  <PasswordField
                    id="newPassword"
                    label="New Password *"
                    value={fields.newPassword}
                    onChange={set('newPassword')}
                    onBlur={touch('newPassword')}
                    error={visibleErrors.newPassword}
                    autoComplete="new-password"
                    showStrength
                  />
                  <AnimatePresence>
                    {fields.newPassword && <Requirements password={fields.newPassword} />}
                  </AnimatePresence>
                </div>

                {/* Confirm password */}
                <PasswordField
                  id="confirmPassword"
                  label="Confirm New Password *"
                  value={fields.confirmPassword}
                  onChange={set('confirmPassword')}
                  onBlur={touch('confirmPassword')}
                  error={visibleErrors.confirmPassword}
                  autoComplete="new-password"
                />

                {/* Status banners */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className="flex items-center gap-2.5 rounded-xl border border-sage/30 bg-sage/8 px-4 py-3"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <p className="font-body text-sm text-sage">
                        Password updated successfully. Stay secure!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand pt-2 dark:border-sand/25">
                  <Link
                    href={AppPaths.dashboard.profile}
                    className="inline-flex items-center gap-2 rounded-lg border border-sand px-5 py-2.5 font-ui text-sm text-warm-gray transition-all duration-200 hover:border-espresso/30 hover:text-espresso dark:border-sand/30"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-6 py-2.5 font-ui text-sm text-cream shadow-sm shadow-terracotta/20 transition-all duration-200 hover:bg-mocha hover:shadow-mocha/20"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Update Password
                  </button>
                </div>
              </form>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-espresso/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="fixed top-0 left-0 z-50 flex h-full w-64 flex-col bg-cream p-6 shadow-2xl dark:bg-linen lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-heading text-lg font-medium text-espresso">My Account</h3>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-warm-gray hover:text-espresso"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <ProfileSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
