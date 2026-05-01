import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { OrdersPage } from '@/features/orders';
import type { SupportedLocale } from '@/types/i18n';

export const metadata: Metadata = {
  title: 'My Orders — Stitchery',
  description: 'Track and manage all your Stitchery purchases.',
};

type Props = { params: Promise<{ locale: string }> };

export default async function OrdersRoute(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale as SupportedLocale);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <OrdersPage />
      </main>
      <Footer />
    </div>
  );
}
