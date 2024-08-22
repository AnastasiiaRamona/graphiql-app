'use client';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import theme from '@/theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
