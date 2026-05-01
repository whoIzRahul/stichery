import type { Metadata } from 'next';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { NotificationsPage } from '@/features/notifications';

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Stay up to date with your orders, offers, and account activity.',
};

export default function DashboardNotificationsRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <NotificationsPage />
      </main>
      <Footer />
    </div>
  );
}
