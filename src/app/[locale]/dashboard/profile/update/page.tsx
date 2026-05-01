import type { Metadata } from 'next';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { UpdateProfilePage } from '@/features/profile';

export const metadata: Metadata = {
  title: 'Edit Profile',
  description: 'Update your Stitchery account details.',
};

export default function UpdateProfileRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <UpdateProfilePage />
      </main>
      <Footer />
    </div>
  );
}
