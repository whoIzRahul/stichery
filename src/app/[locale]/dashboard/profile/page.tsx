import type { Metadata } from 'next';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { ProfilePage } from '@/features/profile';

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your Stitchery account, view orders, and update your preferences.',
};

export default function DashboardProfileRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <ProfilePage />
      </main>
      <Footer />
    </div>
  );
}
