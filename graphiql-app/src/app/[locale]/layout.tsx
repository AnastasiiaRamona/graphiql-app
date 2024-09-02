import type { Metadata } from 'next';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import ThemeWrapper from '@/components/ThemeWrapper/ThemeWrapper';

export const metadata: Metadata = {
  title: 'QueryHub',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html lang={'en'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
