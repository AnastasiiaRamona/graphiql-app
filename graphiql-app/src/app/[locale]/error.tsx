'use client';

import { Button, Typography, Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import ErrorProps from '@/types/types';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function Error({ error, reset }: ErrorProps) {
  const locale = useTranslations();

  return (
    <main>
      <Box
        sx={{
          mb: 2,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <WarningAmberIcon />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontSize: '1.5rem', marginBottom: '0' }}
          >
            {locale('errorTitle')}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {error.message}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => reset()}>
          {locale('tryAgain')}
        </Button>
      </Box>
    </main>
  );
}
