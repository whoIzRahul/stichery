'use client';
import { useTheme } from '@teispace/next-themes';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Logo from '@/assets/logo/stitchery-wordmark.svg';
import DarkLogo from '@/assets/logo/stitchery-wordmark-dark.svg';
import { ThemeToggle } from '@/components/common';
import { openSidebar, selectCartCount } from '@/features/cart';
import { NotificationBell } from '@/features/notifications';
import { selectWishlistCount } from '@/features/wishlist';
import { Link, useRouter } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

function StitcheryWordmark() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === 'dark' ? DarkLogo : Logo}
      alt="Stitchery"
      width={160}
      height={48}
      className="h-7 w-auto"
    />
  );
}

const leftLinks = [
  { label: 'Shop', href: AppPaths.products.list },
  { label: 'Flowers', href: AppPaths.products.category('flowers') },
];

const rightLinks = [
  { label: 'New Arrivals', href: `${AppPaths.products.list}?sort=new` },
  { label: 'Sale', href: `${AppPaths.products.list}?sale=true`, accent: true },
];

const allLinks = [...leftLinks, ...rightLinks];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearchOpen(false);
    router.push(`${AppPaths.products.list}?q=${encodeURIComponent(q)}`);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-cream/96 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'shadow-[0_2px_20px_rgba(44,26,26,0.09)]' : 'border-b border-terracotta/12'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center">
            {/* Left: nav links (desktop) + hamburger (mobile) */}
            <div className="flex flex-1 items-center gap-7">
              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="flex h-8 w-8 items-center justify-center text-warm-gray transition-colors hover:text-espresso md:hidden"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="14" x2="16" y2="14" />
                </svg>
              </button>

              {/* Desktop left links */}
              <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation left">
                {leftLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative font-ui text-[11px] text-warm-gray uppercase tracking-[0.16em] transition-colors duration-200 hover:text-espresso"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-terracotta transition-all duration-250 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: logo (always centered) */}
            <Link
              href={AppPaths.home}
              className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-75"
              aria-label="Stitchery — Home"
            >
              <StitcheryWordmark />
            </Link>

            {/* Right: remaining nav links (desktop) + icons */}
            <div className="flex flex-1 items-center justify-end gap-5">
              {/* Desktop right links */}
              <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation right">
                {rightLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative font-ui text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                      'accent' in link && link.accent
                        ? 'font-semibold text-terracotta hover:text-mocha'
                        : 'text-warm-gray hover:text-espresso'
                    }`}
                  >
                    {link.label}
                    {'accent' in link && link.accent ? null : (
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-terracotta transition-all duration-250 group-hover:w-full" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Divider (desktop) */}
              <span className="hidden h-4 w-px bg-sand md:block" aria-hidden="true" />

              {/* Theme toggle */}
              <ThemeToggle className="hidden sm:flex" />

              {/* Action icons */}
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  aria-label={searchOpen ? 'Close search' : 'Search'}
                  aria-expanded={searchOpen}
                  onClick={() => setSearchOpen((v) => !v)}
                  className={`rounded-full p-2 transition-colors duration-200 ${
                    searchOpen
                      ? 'bg-linen text-terracotta'
                      : 'text-warm-gray hover:bg-linen hover:text-terracotta'
                  }`}
                >
                  {searchOpen ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  )}
                </button>
                <NotificationBell />
                <Link
                  href={AppPaths.wishlist}
                  aria-label={wishlistCount > 0 ? `Wishlist, ${wishlistCount} items` : 'Wishlist'}
                  className="relative hidden rounded-full p-2 text-warm-gray transition-colors duration-200 hover:bg-linen hover:text-terracotta sm:flex"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-terracotta px-0.5 font-ui text-[9px] font-bold text-cream leading-none">
                      {wishlistCount > 9 ? '9+' : wishlistCount}
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  onClick={() => dispatch(openSidebar())}
                  aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}
                  className="relative rounded-full p-2 text-warm-gray transition-colors duration-200 hover:bg-linen hover:text-terracotta"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-terracotta px-0.5 font-ui text-[9px] font-bold text-cream leading-none">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>
                <Link
                  href={AppPaths.auth.login}
                  aria-label="Account"
                  className="hidden rounded-full p-2 text-warm-gray transition-colors duration-200 hover:bg-linen hover:text-terracotta sm:flex"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div
        className={`sticky top-14 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
          searchOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
        } border-b border-terracotta/10 bg-cream/98 backdrop-blur-md`}
        aria-hidden={!searchOpen}
      >
        <form
          onSubmit={handleSearchSubmit}
          className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4 sm:px-6"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-terracotta/60"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for flowers, keyrings, sweaters…"
            className="min-w-0 flex-1 border-0 border-b border-terracotta/25 bg-transparent pb-1 font-ui text-[13px] text-espresso placeholder:text-warm-gray/50 outline-none transition-colors duration-200 focus:border-terracotta"
            autoComplete="off"
            tabIndex={searchOpen ? 0 : -1}
          />
          <button
            type="submit"
            disabled={!searchQuery.trim()}
            className="shrink-0 rounded-sm bg-terracotta px-4 py-1.5 font-ui text-[11px] text-cream uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-mocha disabled:cursor-not-allowed disabled:opacity-40"
          >
            Go
          </button>
        </form>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-espresso/35 backdrop-blur-sm dark:bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <nav
        className={`fixed top-0 left-0 z-50 h-full w-72 transform bg-cream shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-sand px-6 py-5">
          <Link
            href={AppPaths.home}
            className="flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            <StitcheryWordmark />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="p-1 text-warm-gray hover:text-espresso"
          >
            <svg
              width="20"
              height="20"
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

        {/* Drawer links */}
        <div className="flex flex-col gap-0 px-6 py-6">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`border-b border-sand/50 py-4 font-ui text-sm uppercase tracking-[0.12em] transition-colors ${
                'accent' in link && link.accent
                  ? 'font-semibold text-terracotta'
                  : 'text-espresso hover:text-terracotta'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-6 flex items-center justify-between border-b border-sand/50 pb-6">
            <span className="font-ui text-[11px] text-warm-gray uppercase tracking-[0.12em]">
              Appearance
            </span>
            <ThemeToggle />
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <Link
              href={AppPaths.auth.login}
              onClick={() => setMobileOpen(false)}
              className="rounded-sm border border-mocha py-3 text-center font-ui text-mocha text-sm uppercase tracking-[0.1em] transition-colors hover:bg-mocha hover:text-cream"
            >
              Login
            </Link>
            <Link
              href={AppPaths.auth.register}
              onClick={() => setMobileOpen(false)}
              className="rounded-sm bg-terracotta py-3 text-center font-ui text-cream text-sm uppercase tracking-[0.1em] transition-colors hover:bg-mocha"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
