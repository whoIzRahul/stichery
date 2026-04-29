import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { VerifyEmailForm } from '@/features/auth';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import { generateSEOMetadata } from '@/lib/config/seo';
import type { SupportedLocale } from '@/types/i18n';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const locale = (await props.params).locale as SupportedLocale;
  void locale;

  return generateSEOMetadata({
    title: 'Verify Email',
    description: 'Verify your email address to activate your Stitchery account.',
    path: '/verify-email',
  });
}

export default async function VerifyEmailPage(props: Props) {
  const locale = (await props.params).locale as SupportedLocale;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <VerifyEmailForm />
      </main>
      <Footer />
    </div>
  );
}
