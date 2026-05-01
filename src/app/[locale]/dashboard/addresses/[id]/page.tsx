import type { Metadata } from 'next';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { AddressFormPage } from '@/features/profile';

export const metadata: Metadata = {
  title: 'Edit Address',
  description: 'Update a saved delivery address on your account.',
};

export default async function EditAddressRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <AddressFormPage mode="edit" addressId={id} />
      </main>
      <Footer />
    </div>
  );
}
