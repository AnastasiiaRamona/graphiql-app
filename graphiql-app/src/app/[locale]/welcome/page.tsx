import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

const WelcomePage = () => {
  const t = useTranslations('WelcomePage');
  return (
    <main>
      <Box width={'70%'}>
        <Typography variant="h1" component="h2" sx={{ fontSize: '3rem' }}>
          {t('welcomeMessage')}
        </Typography>
        <Typography variant="h2" component="h2" sx={{ fontSize: '2rem' }}>
          {t('happyQuerying')}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          fontSize: '1rem',
        }}
      >
        <p>{t('notSignedIn')}</p>
        <Button variant="contained">{t('signIn')}</Button>
        <Button variant="contained">{t('signUp')}</Button>
      </Box>
    </main>
  );
};

export default WelcomePage;
