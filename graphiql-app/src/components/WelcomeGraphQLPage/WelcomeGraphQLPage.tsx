'use client';

import { Box, Button, Container, Link, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import useCheckingOfAuthorization from '@/hooks/useCheckingOfAuthorization';

const WelcomeGraphQLPage = () => {
  useCheckingOfAuthorization();
  const locale = useTranslations();

  return (
    <Container
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '4vh',
      }}
      maxWidth="md"
      component="main"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '0.5rem',
        }}
      >
        <Typography component="h1" variant="h3" gutterBottom sx={{ mb: 0 }}>
          GraphQL
        </Typography>
        <BarChartRoundedIcon sx={{ fontSize: '3rem' }} />
      </Box>
      <Typography component="p" variant="h6" gutterBottom sx={{ mb: 2 }}>
        {locale('graphqlYourFirstRequest')}
      </Typography>

      <Button
        component={Link}
        href="graphql/aHR0cHM6Ly9ncmFwaHFsemVyby5hbG1hbnNpLm1lL2FwaQ==/cXVlcnkgQWxidW0oJGlkOiBJRCEpIHsKICBhbGJ1bShpZDogJGlkKSB7CiAgICBpZAogICAgdGl0bGUKICB9Cn0K%7CewogICJpZCI6ICIxIgp9"
        variant="contained"
      >
        {locale('getStarted')}
      </Button>
    </Container>
  );
};

export default WelcomeGraphQLPage;
