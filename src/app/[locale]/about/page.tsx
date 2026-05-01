import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AboutPage } from '@/features/about';
import { Footer, Navbar } from '@/features/home';
import { generateSEOMetadata } from '@/lib/config/seo';
import type { SupportedLocale } from '@/types/i18n';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const locale = (await props.params).locale as SupportedLocale;
  void locale;

  return generateSEOMetadata({
    title: 'About Us — Stitchery',
    description:
      'Learn the story behind Stitchery — a small Kathmandu studio handcrafting crochet flowers, sweaters, and keyrings since 2020. Meet the team and discover our values.',
    path: '/about',
  });
}

export default async function AboutRoute(props: Props) {
  const locale = (await props.params).locale as SupportedLocale;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AboutPage />
      </main>
      <Footer />
    </div>
  );
}
