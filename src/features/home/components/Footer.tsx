import { Link } from '@/i18n/navigation';
import { AppPaths } from '@/lib/config/app-paths';

function StitcheryMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width="28"
      height="28"
      aria-hidden="true"
    >
      <g fill="none" stroke="#FAF7F2" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="80" cy="70" rx="34" ry="22" transform="rotate(-22 80 70)" />
        <ellipse cx="120" cy="120" rx="34" ry="22" />
        <ellipse cx="160" cy="170" rx="34" ry="22" transform="rotate(-22 160 170)" />
      </g>
      <circle cx="190" cy="190" r="9" fill="#D4927A" />
    </svg>
  );
}

const shopLinks = [
  { label: 'All Products', href: AppPaths.products.list },
  { label: 'Crochet Flowers', href: AppPaths.products.category('flowers') },
  { label: 'Blankets & Throws', href: AppPaths.products.category('blankets') },
  { label: 'Bags & Totes', href: AppPaths.products.category('bags') },
  { label: 'Key Rings', href: AppPaths.products.category('key-rings') },
  { label: 'New Arrivals', href: `${AppPaths.products.list}?sort=new` },
];

const infoLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Gift Cards', href: '/gift-cards' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
];

const supportLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping Info', href: '/shipping' },
  { label: 'Returns & Exchanges', href: '/returns' },
  { label: 'Track My Order', href: AppPaths.orders.list },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.18 1.22-5.18s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.89 0 1.32.67 1.32 1.47 0 .89-.57 2.23-.87 3.47-.25 1.04.52 1.88 1.53 1.88 1.84 0 3.08-2.35 3.08-5.13 0-2.12-1.43-3.61-3.47-3.61-2.36 0-3.75 1.77-3.75 3.6 0 .71.27 1.48.62 1.9.07.08.08.15.06.23l-.23.96c-.04.14-.12.17-.28.1-1.04-.49-1.69-2.01-1.69-3.23 0-2.63 1.91-5.04 5.51-5.04 2.89 0 5.14 2.06 5.14 4.81 0 2.87-1.81 5.17-4.32 5.17-.84 0-1.64-.44-1.91-.95l-.52 1.96c-.19.72-.69 1.62-1.03 2.17.78.24 1.6.37 2.45.37 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
];

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-5 font-ui text-cream/50 text-xs uppercase tracking-widest">{title}</h4>
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-espresso text-cream dark:bg-[#100b05] dark:[--color-cream:#faf7f2] dark:[--color-espresso:#2c1a1a]">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href={AppPaths.home} className="mb-4 flex items-center gap-2">
              <StitcheryMark />
              <span className="font-display text-cream text-xl">Stitchery</span>
            </Link>
            <p className="mb-6 max-w-xs font-body text-cream/60 text-sm leading-relaxed">
              Handcrafted crochet creations made with love and premium yarn. Every piece tells a
              story of patience, skill, and heartfelt care.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream/60 transition-colors duration-200 hover:bg-cream/20 hover:text-cream"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <FooterColumn title="Shop">
            <ul className="flex flex-col gap-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-cream/60 text-sm transition-colors duration-200 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Info links */}
          <FooterColumn title="Company">
            <ul className="flex flex-col gap-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-cream/60 text-sm transition-colors duration-200 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Support links */}
          <FooterColumn title="Support">
            <ul className="flex flex-col gap-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-cream/60 text-sm transition-colors duration-200 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-cream/10 border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-body text-cream/40 text-xs">
            © {new Date().getFullYear()} Stitchery. All rights reserved. Made with ❤ in Nepal.
          </p>
          <div className="flex items-center gap-4">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="font-body text-cream/40 text-xs transition-colors hover:text-cream/70"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
