'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { ProfileSidebar } from './ProfileSidebar';

/* ─── Types ───────────────────────────────────────────────────────────────── */

type AddressType = 'home' | 'office' | 'other';

interface AddressFields {
  label: string;
  type: AddressType;
  recipientName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  district: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

type ValidatableKey =
  | 'label'
  | 'recipientName'
  | 'phone'
  | 'line1'
  | 'city'
  | 'district'
  | 'province';

type FieldErrors = Partial<Record<ValidatableKey, string>>;
type Touched = Partial<Record<ValidatableKey, boolean>>;

/* ─── Constants ───────────────────────────────────────────────────────────── */

const NEPAL_PROVINCES = [
  'Koshi Province',
  'Madhesh Province',
  'Bagmati Province',
  'Gandaki Province',
  'Lumbini Province',
  'Karnali Province',
  'Sudurpashchim Province',
];

interface MockEntry {
  label: string;
  type: AddressType;
  recipientName: string;
  line1: string;
  line2?: string;
  city: string;
  district: string;
  province: string;
  postalCode?: string;
  phone: string;
  isDefault: boolean;
}

const MOCK_ADDRESSES: Record<string, MockEntry> = {
  a1: {
    label: 'Home',
    type: 'home',
    recipientName: 'Anita Sharma',
    line1: 'Lazimpat, Ward 2',
    city: 'Kathmandu',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    postalCode: '44600',
    phone: '+977 98-4100-0000',
    isDefault: true,
  },
  a2: {
    label: 'Office',
    type: 'office',
    recipientName: 'Anita Sharma',
    line1: 'Pulchowk Campus',
    city: 'Lalitpur',
    district: 'Lalitpur',
    province: 'Bagmati Province',
    postalCode: '44700',
    phone: '+977 98-5200-1234',
    isDefault: false,
  },
  a3: {
    label: "Mom's Place",
    type: 'other',
    recipientName: 'Sita Devi Sharma',
    line1: 'Thamel, Ward 16',
    city: 'Kathmandu',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    postalCode: '44600',
    phone: '+977 98-0111-5678',
    isDefault: false,
  },
  a4: {
    label: 'Holiday Home',
    type: 'other',
    recipientName: 'Anita Sharma',
    line1: 'Lakeside, Ward 6',
    city: 'Pokhara',
    district: 'Kaski',
    province: 'Gandaki Province',
    postalCode: '33700',
    phone: '+977 98-4100-0000',
    isDefault: false,
  },
  a5: {
    label: 'Branch Office',
    type: 'office',
    recipientName: 'Anita Sharma',
    line1: 'New Road, Mahendrapool',
    city: 'Pokhara',
    district: 'Kaski',
    province: 'Gandaki Province',
    postalCode: '33700',
    phone: '+977 61-5200-0099',
    isDefault: false,
  },
  a6: {
    label: 'Apartment',
    type: 'home',
    recipientName: 'Anita Sharma',
    line1: 'Bouddha, Flat 4B',
    city: 'Kathmandu',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    postalCode: '44600',
    phone: '+977 98-4100-0000',
    isDefault: false,
  },
  a7: {
    label: "Dad's House",
    type: 'other',
    recipientName: 'Ram Prasad Sharma',
    line1: 'Durbar Marg, Ward 3',
    city: 'Bhaktapur',
    district: 'Bhaktapur',
    province: 'Bagmati Province',
    postalCode: '44800',
    phone: '+977 98-7000-2233',
    isDefault: false,
  },
  a8: {
    label: 'Studio',
    type: 'office',
    recipientName: 'Anita Sharma',
    line1: 'Jawalakhel, Ground Floor',
    city: 'Lalitpur',
    district: 'Lalitpur',
    province: 'Bagmati Province',
    postalCode: '44700',
    phone: '+977 98-5300-9988',
    isDefault: false,
  },
  a9: {
    label: "Sister's Flat",
    type: 'home',
    recipientName: 'Priya Sharma',
    line1: 'Baneshwor, Ward 10',
    city: 'Kathmandu',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    postalCode: '44600',
    phone: '+977 98-4200-7766',
    isDefault: false,
  },
  a10: {
    label: 'Workshop',
    type: 'office',
    recipientName: 'Anita Sharma',
    line1: 'Patan Industrial Estate',
    city: 'Lalitpur',
    district: 'Lalitpur',
    province: 'Bagmati Province',
    postalCode: '44700',
    phone: '+977 98-5100-4422',
    isDefault: false,
  },
};

/* ─── Validation ──────────────────────────────────────────────────────────── */

function validate(fields: AddressFields): FieldErrors {
  const errors: FieldErrors = {};

  if (!fields.label.trim()) {
    errors.label = 'Label is required (e.g. Home, Office)';
  } else if (fields.label.trim().length > 40) {
    errors.label = 'Label must be 40 characters or fewer';
  }

  if (!fields.recipientName.trim()) {
    errors.recipientName = 'Recipient name is required';
  } else if (fields.recipientName.trim().length < 2) {
    errors.recipientName = 'Name must be at least 2 characters';
  } else if (!/^[a-zA-Z\s'.-]+$/.test(fields.recipientName.trim())) {
    errors.recipientName = 'Name can only contain letters, spaces and hyphens';
  }

  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?[0-9\s\-().]{7,20}$/.test(fields.phone.trim())) {
    errors.phone = 'Enter a valid phone number (e.g. +977 98XXXXXXXX)';
  }

  if (!fields.line1.trim()) {
    errors.line1 = 'Street address is required';
  } else if (fields.line1.trim().length < 3) {
    errors.line1 = 'Enter a more detailed street address';
  }

  if (!fields.city.trim()) {
    errors.city = 'City is required';
  }

  if (!fields.district.trim()) {
    errors.district = 'District is required';
  }

  if (!fields.province) {
    errors.province = 'Province is required';
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
  autoComplete?: string;
  optional?: boolean;
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
  autoComplete,
  optional,
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
          {optional && <span className="ml-1 opacity-50">(optional)</span>}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={hasValue ? placeholder : ''}
          autoComplete={autoComplete}
          // aria-invalid={!!error}
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

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

function SelectField({ id, label, value, onChange, onBlur, error, options }: SelectFieldProps) {
  const hasValue = value !== '';
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
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          // aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full appearance-none border-b bg-transparent pb-2.5 pt-6 font-body text-sm outline-none transition-colors duration-200 focus:border-terracotta ${
            hasValue ? 'text-espresso' : 'text-transparent'
          } ${error ? 'border-red-400' : 'border-sand dark:border-sand/30'}`}
        >
          <option value="" disabled />
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-espresso">
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="pointer-events-none absolute right-0 bottom-3.5 text-warm-gray"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {error && <FieldError message={error} />}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="shrink-0 font-heading text-lg font-medium text-espresso">{children}</h2>
      <div className="flex-1 border-t border-sand dark:border-sand/25" />
    </div>
  );
}

/* ─── Type selector ───────────────────────────────────────────────────────── */

const TYPE_OPTIONS: Array<{ key: AddressType; label: string }> = [
  {
    key: 'home',
    label: 'Home',
  },
  {
    key: 'office',
    label: 'Office',
  },
  {
    key: 'other',
    label: 'Other',
  },
];

function TypeIcon({ type }: { type: AddressType }) {
  if (type === 'home') {
    return (
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
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
  if (type === 'office') {
    return (
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
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  }
  return (
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TypeSelector({
  value,
  onChange,
}: {
  value: AddressType;
  onChange: (v: AddressType) => void;
}) {
  return (
    <div>
      <p className="mb-2.5 font-ui text-xs text-warm-gray">Address Type</p>
      <div className="flex gap-2">
        {TYPE_OPTIONS.map(({ key, label }) => {
          const isActive = value === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 font-ui text-xs transition-all duration-200 ${
                isActive
                  ? 'border-terracotta bg-terracotta/8 text-terracotta shadow-sm'
                  : 'border-sand bg-cream text-warm-gray hover:border-terracotta/40 hover:text-espresso dark:border-sand/30 dark:bg-linen/10'
              }`}
            >
              <TypeIcon type={key} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Default toggle ──────────────────────────────────────────────────────── */

function DefaultToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked ? 'true' : 'false'}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-left"
    >
      <div
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? 'bg-terracotta' : 'bg-sand dark:bg-sand/50'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-cream shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </div>
      <div>
        <p className="font-ui text-sm text-espresso">Set as default address</p>
        <p className="font-body text-xs text-warm-gray">Used automatically at checkout</p>
      </div>
    </button>
  );
}

/* ─── Main page ───────────────────────────────────────────────────────────── */

export interface AddressFormPageProps {
  mode: 'add' | 'edit';
  addressId?: string;
}

const PROVINCE_OPTIONS = NEPAL_PROVINCES.map((p) => ({ value: p, label: p }));

export function AddressFormPage({ mode, addressId }: AddressFormPageProps) {
  const isEdit = mode === 'edit';
  const existing = isEdit && addressId ? MOCK_ADDRESSES[addressId] : null;

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [fields, setFields] = useState<AddressFields>({
    label: existing?.label ?? '',
    type: existing?.type ?? 'home',
    recipientName: existing?.recipientName ?? '',
    phone: existing?.phone ?? '',
    line1: existing?.line1 ?? '',
    line2: existing?.line2 ?? '',
    city: existing?.city ?? '',
    district: existing?.district ?? '',
    province: existing?.province ?? '',
    postalCode: existing?.postalCode ?? '',
    isDefault: existing?.isDefault ?? false,
  });

  const [touched, setTouched] = useState<Touched>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(fields);
  const visibleErrors: FieldErrors = {};
  for (const key of [
    'label',
    'recipientName',
    'phone',
    'line1',
    'city',
    'district',
    'province',
  ] as ValidatableKey[]) {
    if (touched[key] || submitted) visibleErrors[key] = errors[key];
  }

  function setStr(field: keyof Omit<AddressFields, 'type' | 'isDefault'>) {
    return (value: string) => setFields((prev) => ({ ...prev, [field]: value }));
  }

  function touch(field: ValidatableKey) {
    return () => setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTouched({
      label: true,
      recipientName: true,
      phone: true,
      line1: true,
      city: true,
      district: true,
      province: true,
    });
  }

  const isClean = Object.keys(errors).length === 0;
  const showSuccess = submitted && isClean;

  if (isEdit && addressId && !existing) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-sand"
          aria-hidden="true"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <p className="font-heading text-xl text-warm-gray">Address not found</p>
        <Link
          href={AppPaths.dashboard.addresses}
          className="font-ui text-sm text-terracotta hover:underline"
        >
          ← Back to addresses
        </Link>
      </div>
    );
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
          <span className="font-ui text-xs text-warm-gray">Dashboard</span>
          <span className="font-ui text-xs text-warm-gray/40">›</span>
          <Link
            href={AppPaths.dashboard.addresses}
            className="font-ui text-xs text-warm-gray transition-colors hover:text-terracotta"
          >
            Addresses
          </Link>
          <span className="font-ui text-xs text-warm-gray/40">›</span>
          {isEdit && existing && (
            <>
              <span className="font-ui text-xs text-warm-gray">{existing.label}</span>
              <span className="font-ui text-xs text-warm-gray/40">›</span>
            </>
          )}
          <span className="font-ui text-xs text-espresso">{isEdit ? 'Edit' : 'Add'}</span>
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
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h1 className="font-heading text-3xl font-medium text-espresso">
                {isEdit ? 'Edit Address' : 'Add New Address'}
              </h1>
              <p className="mt-1 font-body text-sm text-warm-gray">
                {isEdit
                  ? 'Update your saved delivery address details.'
                  : 'Save a new delivery address for faster checkout.'}
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-10">
                {/* ── Section 1: Address details ─────────────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col gap-6"
                >
                  <SectionHeading>Address Details</SectionHeading>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <InputField
                      id="label"
                      label="Label *"
                      value={fields.label}
                      onChange={setStr('label')}
                      onBlur={touch('label')}
                      error={visibleErrors.label}
                      placeholder="e.g. Home, Office, Mom's Place"
                      autoComplete="off"
                    />
                    <div className="pt-1">
                      <TypeSelector
                        value={fields.type}
                        onChange={(v) => setFields((prev) => ({ ...prev, type: v }))}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* ── Section 2: Recipient ───────────────────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 }}
                  className="flex flex-col gap-6"
                >
                  <SectionHeading>Recipient Information</SectionHeading>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <InputField
                      id="recipientName"
                      label="Recipient Name *"
                      value={fields.recipientName}
                      onChange={setStr('recipientName')}
                      onBlur={touch('recipientName')}
                      error={visibleErrors.recipientName}
                      autoComplete="name"
                    />
                    <InputField
                      id="phone"
                      label="Phone Number *"
                      type="tel"
                      value={fields.phone}
                      onChange={setStr('phone')}
                      onBlur={touch('phone')}
                      error={visibleErrors.phone}
                      placeholder="+977 98XXXXXXXX"
                      autoComplete="tel"
                    />
                  </div>
                </motion.div>

                {/* ── Section 3: Location ────────────────────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.16 }}
                  className="flex flex-col gap-8"
                >
                  <SectionHeading>Location</SectionHeading>
                  <InputField
                    id="line1"
                    label="Street Address *"
                    value={fields.line1}
                    onChange={setStr('line1')}
                    onBlur={touch('line1')}
                    error={visibleErrors.line1}
                    placeholder="Street, building, ward number"
                    autoComplete="address-line1"
                  />
                  <InputField
                    id="line2"
                    label="Apartment, suite, etc."
                    value={fields.line2}
                    onChange={setStr('line2')}
                    onBlur={() => {}}
                    autoComplete="address-line2"
                    optional
                  />
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <InputField
                      id="city"
                      label="City *"
                      value={fields.city}
                      onChange={setStr('city')}
                      onBlur={touch('city')}
                      error={visibleErrors.city}
                      autoComplete="address-level2"
                    />
                    <InputField
                      id="district"
                      label="District *"
                      value={fields.district}
                      onChange={setStr('district')}
                      onBlur={touch('district')}
                      error={visibleErrors.district}
                      autoComplete="off"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <SelectField
                      id="province"
                      label="Province *"
                      value={fields.province}
                      onChange={setStr('province')}
                      onBlur={touch('province')}
                      error={visibleErrors.province}
                      options={PROVINCE_OPTIONS}
                    />
                    <InputField
                      id="postalCode"
                      label="Postal Code"
                      value={fields.postalCode}
                      onChange={setStr('postalCode')}
                      onBlur={() => {}}
                      autoComplete="postal-code"
                      optional
                    />
                  </div>
                </motion.div>

                {/* ── Section 4: Preferences ─────────────────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.24 }}
                  className="flex flex-col gap-6"
                >
                  <SectionHeading>Preferences</SectionHeading>
                  <DefaultToggle
                    checked={fields.isDefault}
                    onChange={(v) => setFields((prev) => ({ ...prev, isDefault: v }))}
                  />
                </motion.div>

                {/* ── Success banner ─────────────────────────────────── */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
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
                        Address ready to save — connect the API to submit.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Actions ────────────────────────────────────────── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.32 }}
                  className="flex flex-wrap items-center justify-between gap-3 border-t border-sand pt-6 dark:border-sand/25"
                >
                  <Link
                    href={AppPaths.dashboard.addresses}
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
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    {isEdit ? 'Update Address' : 'Save Address'}
                  </button>
                </motion.div>
              </div>
            </form>
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
