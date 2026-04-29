import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { ShopPage } from '@/features/products';
import { generateSEOMetadata } from '@/lib/config/seo';
import type { SupportedLocale } from '@/types/i18n';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const locale = (await props.params).locale as SupportedLocale;
  void locale;

  return generateSEOMetadata({
    title: 'Shop — Stitchery | Handmade Crochet from Nepal',
    description:
      'Browse 500+ handmade crochet products — flowers, sweaters, key rings, accessories, and more. Filter by category, price, and type. Free delivery on orders above रू 2,000.',
    path: '/products',
  });
}

export default async function ProductsPage(props: Props) {
  const locale = (await props.params).locale as SupportedLocale;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <ShopPage />
      </main>
      <Footer />
    </div>
  );
}
