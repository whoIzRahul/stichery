import type { Metadata } from 'next';
import { BlogPage } from '@/features/blog';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';

export const metadata: Metadata = {
  title: 'Blog — The Stitchery Journal',
  description:
    'Tutorials, artisan stories, cultural deep-dives, and care guides for handmade crochet from the mountains of Nepal.',
};

export default function BlogRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <BlogPage />
      </main>
      <Footer />
    </div>
  );
}
