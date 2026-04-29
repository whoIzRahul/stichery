import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import {
  AnnouncementBar,
  CategoriesSection,
  FeaturedSection,
  Footer,
  HeroBanner,
  Navbar,
  NewsletterSection,
  PopularProducts,
  Testimonials,
} from '@/features/home';
import { generateSEOMetadata } from '@/lib/config/seo';
import type { SupportedLocale } from '@/types/i18n';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const locale = (await props.params).locale as SupportedLocale;
  void locale;

  return generateSEOMetadata({
    title: 'Stitchery — Handmade Crochet Shop',
    description:
      'Discover unique handcrafted crochet creations — flowers, blankets, bags, key rings, and more. Made with love, shipped across Nepal.',
    path: '/',
  });
}

export default async function Home(props: Props) {
  const locale = (await props.params).locale as SupportedLocale;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <CategoriesSection />
        <PopularProducts />
        <FeaturedSection />
        <Testimonials />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
