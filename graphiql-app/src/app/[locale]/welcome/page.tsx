'use client';

import AuthorizationButtons from '@/components/AuthorizationButtons/AuthorizationButtons';
import MenuButtons from '@/components/MenuButtons/MenuButtons';
import { auth } from '@/firebase/firebase';
import useAuthStore from '@/store/store';
import { Box, CircularProgress, Typography } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const WelcomePage = () => {
  const { setAuthenticated, isAuthenticated } = useAuthStore();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const locale = useTranslations();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || '');
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </main>
    );
  }

  return (
    <main>
      <Box width={'70%'}>
        <Typography
          variant="h1"
          component="h2"
          sx={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          {isAuthenticated
            ? `${locale('welcome-back')} ${userName}!`
            : `${locale('welcome')}`}
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          }}
        >
          {locale('wish')}
        </Typography>
      </Box>
      {isAuthenticated ? <MenuButtons /> : <AuthorizationButtons />}
    </main>
  );
};

export default WelcomePage;
