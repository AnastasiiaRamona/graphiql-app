import type { Metadata } from 'next';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export const metadata: Metadata = {
  title: 'QueryHub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <body>{children}</body>
      </AppRouterCacheProvider>
    </html>
  );
}
