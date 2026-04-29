import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { ProductDetailPage } from '@/features/products';
import { generateSEOMetadata } from '@/lib/config/seo';
import type { SupportedLocale } from '@/types/i18n';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  void locale;

  return generateSEOMetadata({
    title: 'Himalayan Rose Bouquet — Stitchery | Handmade Crochet from Nepal',
    description:
      'Handcrafted crochet rose bouquet made by artisans in Kathmandu Valley. Twelve full-bloom roses, your choice of colour. Ships across Nepal. Starting at रू 1,299.',
    path: '/products/1',
  });
}

export default async function ProductPage(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale as SupportedLocale);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <ProductDetailPage />
      </main>
      <Footer />
    </div>
  );
}
