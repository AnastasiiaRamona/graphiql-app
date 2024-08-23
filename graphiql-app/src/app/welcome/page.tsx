'use client';

import AuthorizationButtons from '@/components/AuthorizationButtons/AuthorizationButtons';
import MenuButtons from '@/components/MenuButtons/MenuButtons';
import { Box, Typography } from '@mui/material';

const WelcomePage = () => {
  const userName = localStorage.getItem('userName');
  const isAuthenticated = localStorage.getItem('isAuthenticated');

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
