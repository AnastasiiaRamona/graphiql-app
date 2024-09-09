'use client';

import PolylineSharpIcon from '@mui/icons-material/PolylineSharp';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import MenuButtons from '../MenuButtons/MenuButtons';

const EmptyStorage = () => {
  const locale = useTranslations();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        height: '100vh',
        width: '100%',
      }}
    >
      <PolylineSharpIcon sx={{ fontSize: 50 }} />
      <Typography variant="h4" sx={{ mt: 2, textAlign: 'center' }}>
        {locale('historyMessage')}
      </Typography>
      <MenuButtons isHistory={true} />
    </Box>
  );
};

export default EmptyStorage;
