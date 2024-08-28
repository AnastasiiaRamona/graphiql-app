'use client';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { lightTheme, darkTheme } from '@/theme/theme';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { useEffect, useState } from 'react';

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode !== null) {
      localStorage.setItem('isDarkMode', isDarkMode.toString());
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  if (isDarkMode === null) {
    return null;
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppRouterCacheProvider>
        <CssBaseline />
        <Box
          sx={{
            height: '100vh',
            background: (theme) => theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          {children}
          <Footer />
        </Box>
      </AppRouterCacheProvider>
    </ThemeProvider>
  );
}
