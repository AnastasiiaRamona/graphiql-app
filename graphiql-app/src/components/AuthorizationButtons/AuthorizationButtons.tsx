import useAuthStore from '@/store/store';
import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const AuthorizationButtons = () => {
  const { setForm } = useAuthStore();
  const locale = useTranslations();
  const params = useParams();
  const localeUrl = params?.locale || 'en';

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        fontSize: '1rem',
        '@media (max-width: 510px)': {
          flexDirection: 'column',
          textAlign: 'center',
        },
      }}
    >
      <p>{locale('questionAboutAuth')}</p>
      <Link href={`/${localeUrl}/authorization`}>
        <Button variant="contained" onClick={() => setForm(true)}>
          {locale('signIn')}
        </Button>
      </Link>
      <Link href={`/${localeUrl}/authorization`}>
        <Button variant="contained" onClick={() => setForm(false)}>
          {locale('signUp')}
        </Button>
      </Link>
    </Box>
  );
};

export default AuthorizationButtons;
