'use client';
import { motion } from 'framer-motion';
import type { UserProfile } from '../types';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accent?: string;
  delay?: number;
}

function StatCard({ icon, value, label, accent = 'text-terracotta', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group flex flex-1 flex-col gap-3 rounded-xl border border-sand bg-cream p-5 transition-shadow duration-200 hover:shadow-md dark:border-sand/20 dark:bg-linen/55"
    >
      <span className={`${accent} w-fit rounded-lg bg-current/10 p-2`}>{icon}</span>
      <div>
        <p className={`font-heading text-3xl font-medium leading-none ${accent}`}>{value}</p>
        <p className="mt-1 font-ui text-xs text-warm-gray">{label}</p>
      </div>
    </motion.div>
  );
}

interface AccountStatsProps {
  user: UserProfile;
}

export function AccountStats({ user }: AccountStatsProps) {
  const totalSpent = `रू ${(user.totalOrders * 2450).toLocaleString()}`;

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-4 font-heading text-xl font-medium text-espresso"
      >
        At a Glance
      </motion.h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <StatCard
          delay={0.15}
          accent="text-terracotta"
          value={user.totalOrders}
          label="Total Orders"
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          }
        />
        <StatCard
          delay={0.2}
          accent="text-rose"
          value={user.wishlistCount}
          label="Wishlist Items"
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          }
        />
        <StatCard
          delay={0.25}
          accent="text-sage"
          value={totalSpent}
          label="Total Spent"
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
      </div>
    </div>
  );
}
