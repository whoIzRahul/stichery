import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BlogDetailPage } from '@/features/blog';
import { POSTS } from '@/features/blog/data';
import { AnnouncementBar, Footer, Navbar } from '@/features/home';
import type { SupportedLocale } from '@/types/i18n';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Post Not Found — The Stitchery Journal' };
  }

  return {
    title: `${post.title} — The Stitchery Journal`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostRoute(props: Props) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale as SupportedLocale);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <BlogDetailPage slug={slug} />
      </main>
      <Footer />
    </div>
  );
}
