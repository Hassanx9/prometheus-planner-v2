import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../globals.css';
import { Navigation } from '@/components/Navigation';
import { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'Prometheus - ARPG Build Planner',
    description: 'Strategic Build Planner for Path of Exile 2 and Diablo IV',
    keywords: ['Path of Exile 2', 'Diablo IV', 'ARPG', 'Build Planner', 'PoE 2', 'Build Guide'],
    authors: [{ name: 'Prometheus Team' }],
    openGraph: {
      title: 'Prometheus - ARPG Build Planner',
      description: 'Strategic Build Planner for Path of Exile 2 and Diablo IV',
      type: 'website',
      locale: locale,
      alternateLocale: locales.filter(l => l !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Prometheus - ARPG Build Planner',
      description: 'Strategic Build Planner for Path of Exile 2 and Diablo IV',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Determine direction based on locale
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
