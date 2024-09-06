'use client';

import AuthorizationButtons from '@/components/AuthorizationButtons/AuthorizationButtons';
import MenuButtons from '@/components/MenuButtons/MenuButtons';
import { auth } from '@/firebase/firebase';
import useAuthStore from '@/store/store';
import { Box, Container, Typography } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import ImportantDevicesTwoToneIcon from '@mui/icons-material/ImportantDevicesTwoTone';
import QuiltedImageList from '@/components/ImageList/ImageList';
import ApplicationTools from '@/components/ApplicationTools/ApplicationTools';
import AboutTeamBox from '@/components/AboutTeam/AboutTeam';

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
    return <Loader />;
  }

  return (
    <>
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          gap: '10vh',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box width={'70%'}>
          <Typography
            variant="h1"
            component="h2"
            sx={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
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
      </Container>
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ImportantDevicesTwoToneIcon sx={{ fontSize: '5rem' }} />
        <Typography
          variant="h1"
          component="h1"
          textAlign={'center'}
          sx={{
            fontSize: 'clamp(2rem, 4vw, 4rem)',
            fontWeight: 500,
            marginBottom: '1rem',
          }}
        >
          {locale('queryHubHeading')}
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          textAlign={'center'}
          sx={{
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: 300,
          }}
        >
          {locale('aboutQueryHub')}
        </Typography>
      </Container>
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '5vh',
          '@media (max-width: 1004px)': {
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }}
      >
        <QuiltedImageList />
        <Typography
          variant="h2"
          component="h2"
          textAlign={'center'}
          width={'30%'}
          sx={{
            fontSize: 'clamp(1rem, 4vw, 2rem)',
            fontWeight: 400,
            '@media (max-width: 1004px)': {
              width: '100%',
            },
          }}
        >
          {locale('queryHubDescription')}
        </Typography>
      </Container>
      <Container
        sx={{
          minHeight: '100vh',
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5vh',
          marginBottom: '2rem',
        }}
      >
        <ApplicationTools />
      </Container>
      <Container
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
      >
        <AboutTeamBox />
      </Container>
    </>
  );
};

export default WelcomePage;
