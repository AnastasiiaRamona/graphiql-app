'use client';

import { lightTheme, darkTheme } from '@/theme/theme';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { useTranslations } from 'next-intl';
import useTokenRefresh from '@/hooks/useTokenRefresh';

export default function ThemeWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const locale = useTranslations();
  useTokenRefresh();

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
      <ToastContainer />
      <CssBaseline />
      <Box
        data-testid="theme-box"
        sx={{
          minHeight: '100vh',
          width: '100vw',
          background: (theme) => theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <ErrorBoundary
          errorDescription={locale('errorDescription')}
          errorToast={locale('errorToast')}
          refreshText={locale('refreshText')}
        >
          {children}
        </ErrorBoundary>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
