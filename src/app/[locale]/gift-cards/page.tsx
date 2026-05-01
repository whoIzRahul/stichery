import type { Metadata } from 'next';
import { GiftCardsPage } from '@/features/giftcards';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';

export const metadata: Metadata = {
  title: 'Gift Cards & Coupons',
  description:
    'Collect exclusive gift cards and discount coupons for handcrafted Stitchery products.',
};

export default function GiftCardsRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <GiftCardsPage />
      </main>
      <Footer />
    </div>
  );
}
