import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ResetPasswordForm } from '@/features/auth';
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
    title: 'Reset Password',
    description: 'Create a new password for your Stitchery account.',
    path: '/reset-password',
  });
}

export default async function ResetPasswordPage(props: Props) {
  const locale = (await props.params).locale as SupportedLocale;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ResetPasswordForm />
      </main>
      <Footer />
    </div>
  );
}
