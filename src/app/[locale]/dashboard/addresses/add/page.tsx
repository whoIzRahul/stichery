import type { Metadata } from 'next';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { AddressFormPage } from '@/features/profile';

export const metadata: Metadata = {
  title: 'Add Address',
  description: 'Add a new delivery address to your account.',
};

export default function AddAddressRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <AddressFormPage mode="add" />
      </main>
      <Footer />
    </div>
  );
}
