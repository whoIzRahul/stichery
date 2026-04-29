import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CartPage } from '@/features/cart';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import type { SupportedLocale } from '@/types/i18n';

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: 'Shopping Bag',
  description: 'Review your selected handcrafted crochet items before checkout.',
};

export default async function CartRoute(props: Props) {
  const locale = (await props.params).locale as SupportedLocale;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <CartPage />
      </main>
      <Footer />
    </div>
  );
}
