import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { WishlistPage } from '@/features/wishlist';
import type { SupportedLocale } from '@/types/i18n';

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Your saved handcrafted crochet favourites.',
};

export default async function WishlistRoute(props: Props) {
  const locale = (await props.params).locale as SupportedLocale;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <WishlistPage />
      </main>
      <Footer />
    </div>
  );
}
