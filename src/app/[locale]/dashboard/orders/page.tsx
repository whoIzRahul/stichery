import type { Metadata } from 'next';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { OrdersPage } from '@/features/orders';

export const metadata: Metadata = {
  title: 'My Orders',
  description: 'View, track, and manage all your Stitchery orders.',
};

export default function DashboardOrdersRoute() {
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
