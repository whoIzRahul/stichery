import type { Metadata } from 'next';
import '@/styles/globals.css';
import {
  Cormorant_Garamond,
  DM_Sans,
  JetBrains_Mono,
  Nunito,
  Playfair_Display,
} from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getMessages, getTimeZone, setRequestLocale } from 'next-intl/server';
import { NavigationResetKey } from '@/components/common';
import { CartSidebar } from '@/features/cart';
import { routing } from '@/i18n/routing';
import { APP_NAME, APP_URL } from '@/lib/config/seo';
import { RootProvider } from '@/providers';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: 'Handcrafted crochet products — flowers, accessories, yarn, and more.',
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [messages, timeZone] = await Promise.all([getMessages(), getTimeZone()]);

  const fontVariables = [
    playfair.variable,
    cormorant.variable,
    dmSans.variable,
    nunito.variable,
    jetbrainsMono.variable,
  ].join(' ');

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={`${fontVariables} bg-cream font-body text-espresso antialiased`}>
        <RootProvider locale={locale} messages={messages} timeZone={timeZone}>
          <NavigationResetKey>{children}</NavigationResetKey>
          <CartSidebar />
        </RootProvider>
      </body>
    </html>
  );
}
