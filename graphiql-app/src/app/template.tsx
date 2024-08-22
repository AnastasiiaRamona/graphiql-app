'use client';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { lightTheme, darkTheme } from '@/theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState } from 'react';

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header toggleTheme={toggleTheme} />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
