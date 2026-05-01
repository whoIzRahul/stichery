'use client';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import type { UserProfile } from '../types';

interface ProfileHeaderProps {
  user: UserProfile;
}

function AvatarInitials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-terracotta via-mocha to-espresso shadow-lg shadow-terracotta/20">
      <span className="font-heading text-2xl font-medium text-cream/90">{initials}</span>
      <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-cream bg-sage">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <polyline
            points="20 6 9 17 4 12"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </span>
    </div>
  );
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const joinYear = new Date(user.memberSince).getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl border border-sand bg-linen p-6 dark:border-sand/20 dark:bg-linen/70"
    >
      {/* Decorative texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #2c1a1a 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-terracotta/6 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <AvatarInitials name={user.name} />

        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-heading text-3xl font-medium leading-tight text-espresso">
                {user.name}
              </h1>
              <p className="font-body text-sm text-warm-gray">{user.email}</p>
            </div>
            <Link
              href={AppPaths.dashboard.updateProfile}
              className="inline-flex items-center gap-1.5 rounded-lg border border-terracotta/30 bg-cream px-4 py-2 font-ui text-xs text-terracotta tracking-wide transition-all duration-200 hover:border-terracotta hover:bg-terracotta/8 dark:bg-cream/5 dark:hover:bg-terracotta/15"
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
              Edit Profile
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            {user.phone && (
              <span className="flex items-center gap-1.5 font-ui text-xs text-warm-gray">
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
                {user.phone}
              </span>
            )}
            <span className="flex items-center gap-1.5 font-ui text-xs text-warm-gray">
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
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Member since {joinYear}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber/15 px-2.5 py-0.5 font-ui text-[11px] font-semibold text-amber">
              ✦ {user.loyaltyPoints.toLocaleString()} pts
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
