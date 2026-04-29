'use client';
import { useTheme } from '@teispace/next-themes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={`h-[22px] w-11 shrink-0 rounded-full bg-sand ${className}`}
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`group relative flex h-[22px] w-11 shrink-0 items-center rounded-full p-[3px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
        isDark
          ? 'bg-[#3c2a1a] shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]'
          : 'bg-sand shadow-[inset_0_1px_3px_rgba(44,26,26,0.18)]'
      } ${className}`}
    >
      {/* Sliding orb */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 38 }}
        className={`relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full shadow-md ${
          isDark ? 'ml-auto bg-[#dba83c]' : 'bg-terracotta'
        }`}
      >
        {/* Sun rays */}
        <motion.svg
          animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? -60 : 0, scale: isDark ? 0.6 : 1 }}
          transition={{ duration: 0.2 }}
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="absolute text-cream"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
        </motion.svg>

        {/* Moon */}
        <motion.svg
          animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : 60, scale: isDark ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute text-[#1e1208]"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.svg>
      </motion.div>
    </button>
  );
}
