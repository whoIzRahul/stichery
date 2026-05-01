'use client';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';

/* ─── Types ───────────────────────────────────────────────────────────────── */
interface Fields {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
}
type FieldErrors = Partial<Record<keyof Fields, string>>;
type Touched = Partial<Record<keyof Fields, boolean>>;

/* ─── Validation ──────────────────────────────────────────────────────────── */
function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (fields.fullName.trim().length < 2) {
    errors.fullName = 'Name must be at least 2 characters';
  } else if (!/^[a-zA-Z\s'-]+$/.test(fields.fullName.trim())) {
    errors.fullName = 'Name can only contain letters, spaces and hyphens';
  }

  if (!fields.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?[0-9\s\-().]{7,20}$/.test(fields.phone.trim())) {
    errors.phone = 'Enter a valid phone number (e.g. +977 98XXXXXXXX)';
  }

  if (!fields.dob) {
    errors.dob = 'Date of birth is required';
  } else {
    const dobDate = new Date(fields.dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const hadBirthdayThisYear =
      today.getMonth() > dobDate.getMonth() ||
      (today.getMonth() === dobDate.getMonth() && today.getDate() >= dobDate.getDate());
    const actualAge = hadBirthdayThisYear ? age : age - 1;
    if (Number.isNaN(dobDate.getTime())) {
      errors.dob = 'Enter a valid date';
    } else if (actualAge < 13) {
      errors.dob = 'You must be at least 13 years old';
    } else if (actualAge > 120) {
      errors.dob = 'Enter a valid date of birth';
    }
  }

  return errors;
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

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  autoComplete?: string;
}

function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  min,
  max,
  autoComplete,
}: InputFieldProps) {
  const hasValue = value.length > 0;

  return (
    <div className="flex flex-col gap-0">
      <div className="relative">
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-0 top-0 origin-top-left font-ui text-sm transition-all duration-200 ${
            hasValue
              ? '-translate-y-5 scale-[0.82] text-terracotta'
              : 'translate-y-3 scale-100 text-warm-gray'
          }`}
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={hasValue ? placeholder : ''}
          min={min}
          max={max}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full border-b bg-transparent pb-2.5 pt-6 font-body text-sm text-espresso outline-none transition-colors duration-200 placeholder:text-warm-gray/40 focus:border-terracotta ${
            error ? 'border-red-400' : 'border-sand dark:border-sand/30'
          }`}
        />
      </div>
      {error && <FieldError message={error} />}
    </div>
  );
}

/* ─── Avatar Picker ───────────────────────────────────────────────────────── */
function AvatarPicker({ name }: { name: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const initials =
    name
      .split(' ')
      .map((n) => n[0] ?? '')
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U';

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
      {/* Avatar circle */}
      <button
        type="button"
        className={`relative flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl transition-all duration-200 ${
          dragging ? 'ring-2 ring-terracotta ring-offset-2' : ''
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        aria-label="Upload profile picture"
      >
        {preview ? (
          // biome-ignore lint/performance/noImgElement: local blob preview, not a network image
          <img src={preview} alt="Profile preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-terracotta via-mocha to-espresso">
            <span className="font-heading text-3xl font-medium text-cream/90">{initials}</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-espresso/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:opacity-100">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span className="font-ui text-[10px] text-cream">Upload</span>
        </div>
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onInputChange}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Copy beside avatar */}
      <div className="flex flex-col gap-1">
        <p className="font-ui text-sm font-semibold text-espresso">Profile Photo</p>
        <p className="font-body text-xs text-warm-gray">
          Click or drag &amp; drop to upload. JPG, PNG or WebP — max 5 MB.
        </p>
        {preview && (
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="mt-1 w-fit font-ui text-xs text-rose underline-offset-2 hover:underline"
          >
            Remove photo
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Section header ──────────────────────────────────────────────────────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="font-heading text-lg font-medium text-espresso">{children}</h2>
      <div className="flex-1 border-t border-sand dark:border-sand/25" />
    </div>
  );
}

/* ─── Main form ───────────────────────────────────────────────────────────── */
const today = new Date().toISOString().split('T')[0] as string;
const minDob = new Date(new Date().getFullYear() - 120, 0, 1).toISOString().split('T')[0] as string;

export function UpdateProfileForm() {
  const [fields, setFields] = useState<Fields>({
    fullName: 'Anita Sharma',
    email: 'anita.sharma@gmail.com',
    phone: '+977 98-4100-0000',
    dob: '1995-08-14',
  });
  const [touched, setTouched] = useState<Touched>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(fields);
  const visibleErrors: FieldErrors = {};
  for (const key of Object.keys(errors) as (keyof Fields)[]) {
    if (touched[key] || submitted) visibleErrors[key] = errors[key];
  }

  function set(field: keyof Fields) {
    return (value: string) => setFields((prev) => ({ ...prev, [field]: value }));
  }
  function touch(field: keyof Fields) {
    return () => setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTouched({ fullName: true, email: true, phone: true, dob: true });
    if (Object.keys(errors).length > 0) return;
    // Submission handled when API is ready
  }

  const isClean = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-10">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-sand bg-linen p-6 dark:border-sand/20 dark:bg-linen/10"
        >
          <AvatarPicker name={fields.fullName} />
        </motion.div>

        {/* Personal info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading>Personal Information</SectionHeading>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <InputField
              id="fullName"
              label="Full Name *"
              value={fields.fullName}
              onChange={set('fullName')}
              onBlur={touch('fullName')}
              error={visibleErrors.fullName}
              autoComplete="name"
            />
            <InputField
              id="dob"
              label="Date of Birth *"
              type="date"
              value={fields.dob}
              onChange={set('dob')}
              onBlur={touch('dob')}
              error={visibleErrors.dob}
              max={today}
              min={minDob}
              autoComplete="bday"
            />
          </div>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="flex flex-col gap-6"
        >
          <SectionHeading>Contact Information</SectionHeading>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <InputField
              id="email"
              label="Email Address *"
              type="email"
              value={fields.email}
              onChange={set('email')}
              onBlur={touch('email')}
              error={visibleErrors.email}
              autoComplete="email"
            />
            <InputField
              id="phone"
              label="Phone Number *"
              type="tel"
              value={fields.phone}
              onChange={set('phone')}
              onBlur={touch('phone')}
              error={visibleErrors.phone}
              placeholder="+977 98XXXXXXXX"
              autoComplete="tel"
            />
          </div>
        </motion.div>

        {/* Success hint */}
        {submitted && isClean && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
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
              Profile ready to save — connect the API to submit.
            </p>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="flex flex-wrap items-center justify-between gap-3 border-t border-sand pt-6 dark:border-sand/25"
        >
          <Link
            href={AppPaths.dashboard.profile}
            className="inline-flex items-center gap-2 rounded-lg border border-sand px-5 py-2.5 font-ui text-sm text-warm-gray transition-all duration-200 hover:border-espresso/30 hover:text-espresso dark:border-sand/30 dark:hover:border-espresso/20"
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
            className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-6 py-2.5 font-ui text-sm text-cream shadow-sm shadow-terracotta/20 transition-all duration-200 hover:bg-mocha hover:shadow-mocha/20 disabled:cursor-not-allowed disabled:opacity-50"
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
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save Changes
          </button>
        </motion.div>
      </div>
    </form>
  );
}
