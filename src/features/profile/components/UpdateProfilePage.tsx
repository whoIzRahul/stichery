'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ProfileSidebar } from './ProfileSidebar';
import { UpdateProfileForm } from './UpdateProfileForm';

export function UpdateProfilePage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
          <span className="font-ui text-xs text-warm-gray">Profile</span>
          <span className="font-ui text-xs text-warm-gray/40">›</span>
          <span className="font-ui text-xs text-espresso">Edit</span>
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
            {/* Page heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h1 className="font-heading text-3xl font-medium text-espresso">Edit Profile</h1>
              <p className="mt-1 font-body text-sm text-warm-gray">
                Keep your personal details up to date.
              </p>
            </motion.div>

            <UpdateProfileForm />
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
