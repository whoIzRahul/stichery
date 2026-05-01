import type { Metadata } from 'next';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { SecurityPage } from '@/features/profile';

export const metadata: Metadata = {
  title: 'Security',
  description: 'Manage your account security and change your password.',
};

export default function DashboardSecurityRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <SecurityPage />
      </main>
      <Footer />
    </div>
  );
}
