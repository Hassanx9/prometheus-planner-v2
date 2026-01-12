import { locales } from '@/i18n';
import { redirect } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This root layout will redirect to default locale
  return children;
}
