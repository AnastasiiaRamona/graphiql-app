'use client';

import AuthorizationButtons from '@/components/AuthorizationButtons/AuthorizationButtons';
import MenuButtons from '@/components/MenuButtons/MenuButtons';
import { auth } from '@/firebase/firebase';
import useAuthStore from '@/store/store';
import { Box, CircularProgress, Typography } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const WelcomePage = () => {
  const { setAuthenticated, isAuthenticated } = useAuthStore();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

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
        <Typography variant="h1" component="h2" sx={{ fontSize: '3rem' }}>
          {isAuthenticated
            ? `Welcome back, ${userName}!`
            : 'Welcome to the GraphiQL App!'}
        </Typography>
        <Typography variant="h2" component="h2" sx={{ fontSize: '2rem' }}>
          Happy querying!
        </Typography>
      </Box>
      {isAuthenticated ? <MenuButtons /> : <AuthorizationButtons />}
    </main>
  );
};

export default WelcomePage;
