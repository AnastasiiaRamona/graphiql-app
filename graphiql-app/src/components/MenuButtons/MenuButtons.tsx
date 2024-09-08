import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const MenuButtons = () => {
  const locale = useTranslations();
  const params = useParams();
  const localeUrl = params.locale || 'en';

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
      <p>{locale('chooseOne')}</p>
      <Link href={`/${localeUrl}/GET/`}>
        <Button variant="contained">{locale('restfullClient')}</Button>
      </Link>
      <Link href={`/${localeUrl}/graphql`}>
        <Button variant="contained">{locale('graphiqlClient')}</Button>
      </Link>
      <Link href={`/${localeUrl}/history`}>
        <Button variant="contained">{locale('history')}</Button>
      </Link>
    </Box>
  );
};

export default MenuButtons;
