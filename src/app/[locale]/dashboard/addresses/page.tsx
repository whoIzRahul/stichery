import type { Metadata } from 'next';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { AddressesPage } from '@/features/profile';

export const metadata: Metadata = {
  title: 'Saved Addresses',
  description: 'Manage your saved delivery addresses for faster checkout.',
};

export default function DashboardAddressesRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <AddressesPage />
      </main>
      <Footer />
    </div>
  );
}
