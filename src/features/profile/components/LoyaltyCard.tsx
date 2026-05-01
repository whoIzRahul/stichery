'use client';
import { motion } from 'framer-motion';
import type { UserProfile } from '../types';

const POINTS_TO_NEXT_TIER = 5000;

interface LoyaltyCardProps {
  user: UserProfile;
}

export function LoyaltyCard({ user }: LoyaltyCardProps) {
  const progress = Math.min((user.loyaltyPoints / POINTS_TO_NEXT_TIER) * 100, 100);
  const pointsLeft = Math.max(POINTS_TO_NEXT_TIER - user.loyaltyPoints, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="relative overflow-hidden rounded-2xl bg-linear-to-br from-espresso via-mocha to-terracotta p-6 text-cream shadow-lg shadow-espresso/20"
    >
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, #faf7f2 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-cream/5 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-ui text-[11px] text-cream/50 uppercase tracking-[0.16em]">
              Loyalty Tier
            </p>
            <p className="font-heading text-2xl font-medium text-cream">
              {user.loyaltyPoints >= 5000
                ? '✦ Gold'
                : user.loyaltyPoints >= 2000
                  ? '◆ Silver'
                  : '● Bronze'}
            </p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="font-heading text-3xl font-medium text-amber">
              {user.loyaltyPoints.toLocaleString()}
            </span>
            <span className="font-ui text-[10px] text-cream/50">points earned</span>
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex justify-between font-ui text-[11px] text-cream/60">
            <span>Progress to next tier</span>
            <span>
              {pointsLeft > 0 ? `${pointsLeft.toLocaleString()} pts to go` : 'Max tier reached!'}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-cream/15">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
              className="h-full rounded-full bg-linear-to-r from-amber to-rose"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-cream/10 px-3 py-2.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="font-ui text-[11px] text-cream/70">
            Earn 1 point per रू 10 spent. Redeem at checkout.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
