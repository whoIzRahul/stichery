import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { TrackOrderPage } from '@/features/orders';
import { MOCK_ORDERS } from '@/features/orders/data';
import type { SupportedLocale } from '@/types/i18n';

type Props = { params: Promise<{ locale: string; orderId: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { orderId } = await props.params;
  const order = MOCK_ORDERS.find((o) => o.id === orderId);
  return {
    title: order ? `Track ${order.id} — Stitchery` : 'Order Not Found — Stitchery',
    description: order
      ? `Track the delivery status of your Stitchery order ${order.id}.`
      : undefined,
  };
}

export async function generateStaticParams() {
  return MOCK_ORDERS.map((order) => ({ orderId: order.id }));
}

export default async function TrackOrderRoute(props: Props) {
  const { locale, orderId } = await props.params;
  setRequestLocale(locale as SupportedLocale);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <TrackOrderPage orderId={orderId} />
      </main>
      <Footer />
    </div>
  );
}
