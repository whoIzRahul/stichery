'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { ProfileSidebar } from './ProfileSidebar';

type AddressType = 'home' | 'office' | 'other';
type FilterKey = AddressType | 'all';
type SortKey = 'newest' | 'oldest' | 'label-asc' | 'label-desc' | 'city-asc';

interface AddressEntry {
  id: string;
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
  createdAt: string;
}

const TYPE_META: Record<
  AddressType,
  { label: string; color: string; bg: string; border: string; band: string; iconBg: string }
> = {
  home: {
    label: 'Home',
    color: 'text-terracotta',
    bg: 'bg-terracotta/5 dark:bg-terracotta/8',
    border: 'border-terracotta/20',
    band: 'bg-terracotta',
    iconBg: 'bg-terracotta/12 text-terracotta dark:bg-terracotta/15',
  },
  office: {
    label: 'Office',
    color: 'text-mocha',
    bg: 'bg-mocha/5 dark:bg-mocha/8',
    border: 'border-mocha/20',
    band: 'bg-mocha',
    iconBg: 'bg-mocha/12 text-mocha dark:bg-mocha/15',
  },
  other: {
    label: 'Other',
    color: 'text-warm-gray',
    bg: 'bg-linen dark:bg-linen/15',
    border: 'border-sand dark:border-sand/30',
    band: 'bg-warm-gray',
    iconBg: 'bg-sand/80 text-warm-gray dark:bg-sand/25',
  },
};

const MOCK_ADDRESSES: AddressEntry[] = [
  {
    id: 'a1',
    label: 'Home',
    type: 'home',
    recipientName: 'Anita Sharma',
    line1: 'Lazimpat, Ward 2',
    city: 'Kathmandu',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    postalCode: '44600',
    phone: '+977 98-4100-0000',
    createdAt: '2023-03-15',
  },
  {
    id: 'a2',
    label: 'Office',
    type: 'office',
    recipientName: 'Anita Sharma',
    line1: 'Pulchowk Campus',
    city: 'Lalitpur',
    district: 'Lalitpur',
    province: 'Bagmati Province',
    postalCode: '44700',
    phone: '+977 98-5200-1234',
    createdAt: '2023-06-20',
  },
  {
    id: 'a3',
    label: "Mom's Place",
    type: 'other',
    recipientName: 'Sita Devi Sharma',
    line1: 'Thamel, Ward 16',
    city: 'Kathmandu',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    postalCode: '44600',
    phone: '+977 98-0111-5678',
    createdAt: '2023-09-05',
  },
  {
    id: 'a4',
    label: 'Holiday Home',
    type: 'other',
    recipientName: 'Anita Sharma',
    line1: 'Lakeside, Ward 6',
    city: 'Pokhara',
    district: 'Kaski',
    province: 'Gandaki Province',
    postalCode: '33700',
    phone: '+977 98-4100-0000',
    createdAt: '2024-01-12',
  },
  {
    id: 'a5',
    label: 'Branch Office',
    type: 'office',
    recipientName: 'Anita Sharma',
    line1: 'New Road, Mahendrapool',
    city: 'Pokhara',
    district: 'Kaski',
    province: 'Gandaki Province',
    postalCode: '33700',
    phone: '+977 61-5200-0099',
    createdAt: '2024-03-08',
  },
  {
    id: 'a6',
    label: 'Apartment',
    type: 'home',
    recipientName: 'Anita Sharma',
    line1: 'Bouddha, Flat 4B',
    city: 'Kathmandu',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    postalCode: '44600',
    phone: '+977 98-4100-0000',
    createdAt: '2024-06-15',
  },
  {
    id: 'a7',
    label: "Dad's House",
    type: 'other',
    recipientName: 'Ram Prasad Sharma',
    line1: 'Durbar Marg, Ward 3',
    city: 'Bhaktapur',
    district: 'Bhaktapur',
    province: 'Bagmati Province',
    postalCode: '44800',
    phone: '+977 98-7000-2233',
    createdAt: '2024-08-20',
  },
  {
    id: 'a8',
    label: 'Studio',
    type: 'office',
    recipientName: 'Anita Sharma',
    line1: 'Jawalakhel, Ground Floor',
    city: 'Lalitpur',
    district: 'Lalitpur',
    province: 'Bagmati Province',
    postalCode: '44700',
    phone: '+977 98-5300-9988',
    createdAt: '2024-10-03',
  },
  {
    id: 'a9',
    label: "Sister's Flat",
    type: 'home',
    recipientName: 'Priya Sharma',
    line1: 'Baneshwor, Ward 10',
    city: 'Kathmandu',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    postalCode: '44600',
    phone: '+977 98-4200-7766',
    createdAt: '2025-01-18',
  },
  {
    id: 'a10',
    label: 'Workshop',
    type: 'office',
    recipientName: 'Anita Sharma',
    line1: 'Patan Industrial Estate',
    city: 'Lalitpur',
    district: 'Lalitpur',
    province: 'Bagmati Province',
    postalCode: '44700',
    phone: '+977 98-5100-4422',
    createdAt: '2025-04-01',
  },
];

const INITIAL_DEFAULT_ID = 'a1';
const PAGE_SIZE = 6;

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: 'newest', label: 'Newest Added' },
  { value: 'oldest', label: 'Oldest Added' },
  { value: 'label-asc', label: 'Label A → Z' },
  { value: 'label-desc', label: 'Label Z → A' },
  { value: 'city-asc', label: 'City A → Z' },
];

const FILTER_OPTIONS: Array<{ key: FilterKey; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'home', label: 'Home' },
  { key: 'office', label: 'Office' },
  { key: 'other', label: 'Other' },
];

function HomeIcon() {
  return (
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function OfficeIcon() {
  return (
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
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function OtherIcon() {
  return (
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function AddressTypeIcon({ type }: { type: AddressType }) {
  if (type === 'home') return <HomeIcon />;
  if (type === 'office') return <OfficeIcon />;
  return <OtherIcon />;
}

interface AddressCardProps {
  address: AddressEntry;
  isDefault: boolean;
  isDeleting: boolean;
  index: number;
  onSetDefault: () => void;
  onDeleteStart: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

function AddressCard({
  address,
  isDefault,
  isDeleting,
  index,
  onSetDefault,
  onDeleteStart,
  onDeleteConfirm,
  onDeleteCancel,
}: AddressCardProps) {
  const meta = TYPE_META[address.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.38, delay: index * 0.05 }}
      layout
    >
      <div
        className={`flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-sand/20 ${
          isDeleting ? 'border-rose/30 bg-rose/3' : `${meta.border} bg-cream dark:bg-linen/50`
        }`}
      >
        {/* Top type band */}
        <div className={`h-1.5 w-full ${isDeleting ? 'bg-rose/60' : meta.band}`} />

        <div className="flex flex-col gap-4 p-5">
          {/* Card header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.iconBg}`}
              >
                <AddressTypeIcon type={address.type} />
              </span>
              <div>
                <p className="font-heading text-base font-medium leading-tight text-espresso">
                  {address.label}
                </p>
                <span className={`font-ui text-[10px] uppercase tracking-widest ${meta.color}`}>
                  {meta.label}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {isDefault && (
                <span className="rounded-full bg-sage/15 px-2.5 py-0.5 font-ui text-[10px] font-semibold text-sage">
                  Default
                </span>
              )}
              <div className="flex items-center gap-1">
                <Link
                  href={AppPaths.dashboard.editAddress(address.id)}
                  aria-label={`Edit ${address.label}`}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-sand text-warm-gray transition-all duration-200 hover:border-espresso/30 hover:bg-linen hover:text-espresso dark:border-sand/30 dark:hover:bg-sand/10"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Link>
                <button
                  type="button"
                  aria-label={`Delete ${address.label}`}
                  onClick={onDeleteStart}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-sand text-warm-gray transition-all duration-200 hover:border-rose/40 hover:bg-rose/8 hover:text-rose dark:border-sand/30"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Address details */}
          <div className="flex flex-col gap-1">
            <p className="font-ui text-sm font-semibold text-espresso">{address.recipientName}</p>
            <p className="font-body text-sm text-warm-gray">{address.line1}</p>
            {address.line2 && <p className="font-body text-sm text-warm-gray">{address.line2}</p>}
            <p className="font-body text-sm text-warm-gray">
              {address.city}, {address.district}
            </p>
            <p className="font-body text-sm text-warm-gray">
              {address.province}
              {address.postalCode ? ` · ${address.postalCode}` : ''}
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 font-ui text-xs text-warm-gray">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.5 19.79 19.79 0 0 1 1.61 4a2 2 0 0 1 1.95-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
              </svg>
              {address.phone}
            </p>
          </div>

          {/* Footer actions */}
          <AnimatePresence mode="wait">
            {isDeleting ? (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2 rounded-xl border border-rose/25 bg-rose/6 px-3 py-2.5"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-rose"
                  aria-hidden="true"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <p className="flex-1 font-ui text-xs text-espresso">Remove this address?</p>
                <button
                  type="button"
                  onClick={onDeleteConfirm}
                  className="font-ui text-xs font-semibold text-rose transition-opacity hover:opacity-80"
                >
                  Remove
                </button>
                <span className="text-warm-gray/30" aria-hidden="true">
                  ·
                </span>
                <button
                  type="button"
                  onClick={onDeleteCancel}
                  className="font-ui text-xs text-warm-gray hover:text-espresso"
                >
                  Cancel
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-between"
              >
                {isDefault ? (
                  <span className="font-ui text-xs text-warm-gray/50">
                    Your default delivery address
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onSetDefault}
                    className="font-ui text-xs text-terracotta transition-opacity hover:opacity-75 hover:underline"
                  >
                    Set as Default →
                  </button>
                )}
                <span className="font-ui text-[10px] text-warm-gray/35">
                  {new Date(address.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function AddressesPage() {
  const [addresses, setAddresses] = useState<AddressEntry[]>(MOCK_ADDRESSES);
  const [defaultId, setDefaultId] = useState(INITIAL_DEFAULT_ID);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterKey>('all');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: addresses.length };
    for (const a of addresses) {
      c[a.type] = (c[a.type] ?? 0) + 1;
    }
    return c;
  }, [addresses]);

  const enriched = useMemo(
    () => addresses.map((a) => ({ ...a, isDefault: a.id === defaultId })),
    [addresses, defaultId],
  );

  const filtered = useMemo(() => {
    const list =
      filterType === 'all' ? [...enriched] : enriched.filter((a) => a.type === filterType);

    switch (sortKey) {
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'label-asc':
        list.sort((a, b) => a.label.localeCompare(b.label));
        break;
      case 'label-desc':
        list.sort((a, b) => b.label.localeCompare(a.label));
        break;
      case 'city-asc':
        list.sort((a, b) => a.city.localeCompare(b.city));
        break;
    }
    return list;
  }, [enriched, filterType, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function changeFilter(f: FilterKey) {
    setFilterType(f);
    setCurrentPage(1);
  }

  function handleDeleteConfirm(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (defaultId === id) {
      const next = addresses.find((a) => a.id !== id);
      setDefaultId(next?.id ?? '');
    }
    setDeletingId(null);
  }

  const summaryStats = [
    { label: 'Total Saved', value: addresses.length, accent: 'text-espresso' },
    { label: 'Home', value: counts.home ?? 0, accent: 'text-terracotta' },
    { label: 'Office', value: counts.office ?? 0, accent: 'text-mocha' },
    { label: 'Other', value: counts.other ?? 0, accent: 'text-warm-gray' },
  ];

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
          <span className="font-ui text-xs text-espresso">Addresses</span>
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
            {/* Page header */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex items-start justify-between gap-4"
            >
              <div>
                <h1 className="font-heading text-2xl font-medium text-espresso">Saved Addresses</h1>
                <p className="mt-1 font-body text-sm text-warm-gray">
                  Manage delivery locations for faster checkout
                </p>
              </div>
              <Link
                href={AppPaths.dashboard.addAddress}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-terracotta/30 bg-cream px-4 py-2.5 font-ui text-xs text-terracotta tracking-wide transition-all duration-200 hover:border-terracotta hover:bg-terracotta/8 dark:bg-cream/5 dark:hover:bg-terracotta/15"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Address
              </Link>
            </motion.div>

            {/* Summary stats */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {summaryStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.06 }}
                  className="rounded-xl border border-sand bg-cream p-4 shadow-sm dark:border-sand/20 dark:bg-linen/55"
                >
                  <p className={`font-heading text-2xl font-medium leading-none ${stat.accent}`}>
                    {stat.value}
                  </p>
                  <p className="mt-1.5 font-ui text-xs text-warm-gray">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Filter + Sort */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-5"
            >
              {/* Type filter pills */}
              <div className="flex flex-wrap gap-2">
                {FILTER_OPTIONS.map(({ key, label }) => {
                  const count = counts[key] ?? 0;
                  const isActive = filterType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => changeFilter(key)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-ui text-xs transition-all duration-200 ${
                        isActive
                          ? 'border-terracotta bg-terracotta/10 text-terracotta shadow-sm'
                          : 'border-sand bg-cream text-warm-gray hover:border-terracotta/40 hover:text-espresso dark:border-sand/30 dark:bg-linen/20'
                      }`}
                    >
                      {label}
                      {count > 0 && (
                        <span
                          className={`rounded-full px-1.5 py-0.5 font-ui text-[10px] font-semibold ${
                            isActive
                              ? 'bg-terracotta/15 text-terracotta'
                              : 'bg-sand/60 text-warm-gray dark:bg-sand/20'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sort + result count */}
              <div className="mt-3 flex items-center justify-between">
                <p className="font-body text-sm text-warm-gray">
                  {filtered.length} {filtered.length === 1 ? 'address' : 'addresses'}
                </p>
                <div className="relative">
                  <select
                    value={sortKey}
                    onChange={(e) => {
                      setSortKey(e.target.value as SortKey);
                      setCurrentPage(1);
                    }}
                    className="appearance-none rounded-lg border border-sand bg-cream py-1.5 pl-3 pr-8 font-ui text-xs text-espresso transition-colors duration-200 hover:border-terracotta/40 focus:border-terracotta focus:outline-none dark:border-sand/30 dark:bg-linen/20"
                    aria-label="Sort addresses"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
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
                    className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-warm-gray"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Address grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filterType}-${sortKey}-${safePage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {paginated.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-sand py-20 text-center dark:border-sand/30"
                  >
                    <svg
                      width="36"
                      height="36"
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
                    <p className="font-heading text-lg text-warm-gray">No addresses found</p>
                    <button
                      type="button"
                      onClick={() => changeFilter('all')}
                      className="font-ui text-sm text-terracotta hover:underline"
                    >
                      Clear filter
                    </button>
                  </motion.div>
                ) : (
                  <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2" layout>
                    <AnimatePresence>
                      {paginated.map((address, i) => (
                        <AddressCard
                          key={address.id}
                          address={address}
                          isDefault={address.isDefault}
                          isDeleting={deletingId === address.id}
                          index={i}
                          onSetDefault={() => setDefaultId(address.id)}
                          onDeleteStart={() => setDeletingId(address.id)}
                          onDeleteConfirm={() => handleDeleteConfirm(address.id)}
                          onDeleteCancel={() => setDeletingId(null)}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-8 flex items-center justify-center gap-1.5"
              >
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-sand text-warm-gray transition-all duration-200 hover:border-terracotta hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-40 dark:border-sand/30"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === safePage ? 'page' : undefined}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border font-ui text-xs transition-all duration-200 ${
                      page === safePage
                        ? 'border-terracotta bg-terracotta text-cream shadow-sm'
                        : 'border-sand bg-cream text-warm-gray hover:border-terracotta/50 hover:text-espresso dark:border-sand/30 dark:bg-linen/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-sand text-warm-gray transition-all duration-200 hover:border-terracotta hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-40 dark:border-sand/30"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </motion.div>
            )}

            {/* Add address CTA when list is short */}
            {addresses.length < 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mt-4"
              >
                <Link
                  href={AppPaths.dashboard.addAddress}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-terracotta/30 bg-terracotta/4 py-6 text-terracotta transition-colors duration-200 hover:border-terracotta/60 hover:bg-terracotta/8 sm:w-auto sm:min-w-[calc(50%-8px)]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span className="font-ui text-sm">Add New Address</span>
                </Link>
              </motion.div>
            )}
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
