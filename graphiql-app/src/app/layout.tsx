import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QueryHub',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'en'}>
      <body>{children}</body>
    </html>
  );
}
