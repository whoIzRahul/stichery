'use client';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import type { Address } from '../types';

interface SavedAddressesProps {
  addresses: Address[];
}

export function SavedAddresses({ addresses }: SavedAddressesProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="mb-4 flex items-center justify-between"
      >
        <h2 className="font-heading text-xl font-medium text-espresso">Saved Addresses</h2>
        <Link
          href={AppPaths.dashboard.addresses}
          className="font-ui text-xs text-terracotta underline-offset-2 transition-colors hover:text-mocha hover:underline"
        >
          Manage →
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {addresses.map((addr, i) => (
          <motion.div
            key={addr.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
            className="relative rounded-xl border border-sand bg-cream p-4 dark:border-sand/20 dark:bg-linen/55"
          >
            {addr.isDefault && (
              <span className="absolute top-3 right-3 rounded-full bg-sage/15 px-2 py-0.5 font-ui text-[10px] font-semibold text-sage">
                Default
              </span>
            )}
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linen text-terracotta dark:bg-linen/20">
                <svg
                  width="15"
                  height="15"
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
              </span>
              <div>
                <p className="font-ui text-sm font-semibold text-espresso">{addr.label}</p>
                <p className="font-body text-xs text-warm-gray">{addr.line1}</p>
                <p className="font-body text-xs text-warm-gray">{addr.city}</p>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 + addresses.length * 0.06 }}
        >
          <Link
            href={AppPaths.dashboard.addresses}
            className="flex h-full min-h-[88px] items-center justify-center gap-2 rounded-xl border border-dashed border-terracotta/30 bg-terracotta/4 p-4 text-terracotta transition-colors hover:border-terracotta/60 hover:bg-terracotta/8 dark:bg-terracotta/8"
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
            <span className="font-ui text-sm">Add Address</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
