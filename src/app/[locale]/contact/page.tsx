import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ContactPage } from '@/features/contact';
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
    title: 'Contact Us',
    description:
      "Have a question or custom order request? Reach out to the Stitchery team — we're happy to help.",
    path: '/contact',
  });
}

export default async function ContactRoute(props: Props) {
  const locale = (await props.params).locale as SupportedLocale;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <ContactPage />
      </main>
      <Footer />
    </div>
  );
}
