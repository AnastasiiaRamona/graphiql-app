'use client';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { lightTheme, darkTheme } from '@/theme/theme';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('isDarkMode');
      return savedMode === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isDarkMode', isDarkMode.toString());
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
        <Header toggleTheme={toggleTheme} />
        {children}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
