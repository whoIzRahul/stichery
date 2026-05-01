'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';

const navItems = [
  {
    href: AppPaths.dashboard.profile,
    label: 'Profile',
    icon: (
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
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    href: AppPaths.dashboard.orders,
    label: 'My Orders',
    icon: (
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
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    href: AppPaths.wishlist,
    label: 'Wishlist',
    icon: (
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
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    href: AppPaths.dashboard.addresses,
    label: 'Addresses',
    icon: (
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
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    href: AppPaths.dashboard.notifications,
    label: 'Notifications',
    icon: (
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
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    href: AppPaths.dashboard.changePassword,
    label: 'Security',
    icon: (
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
    ),
  },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col gap-1">
      <p className="mb-3 font-ui text-[10px] text-warm-gray uppercase tracking-[0.18em]">
        My Account
      </p>
      {navItems.map((item, i) => {
        const isActive = pathname.includes(item.href);
        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 font-ui text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-terracotta/10 text-terracotta dark:bg-terracotta/20'
                  : 'text-warm-gray hover:bg-linen hover:text-espresso dark:hover:bg-sand/10 dark:hover:text-espresso'
              }`}
            >
              <span
                className={`transition-colors duration-200 ${isActive ? 'text-terracotta' : 'text-warm-gray group-hover:text-espresso'}`}
              >
                {item.icon}
              </span>
              {item.label}
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-terracotta" />}
            </Link>
          </motion.div>
        );
      })}

      <div className="mt-6 border-t border-sand pt-4 dark:border-sand/30">
        <button
          type="button"
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-ui text-sm text-warm-gray transition-all duration-200 hover:bg-rose/10 hover:text-rose"
        >
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
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
