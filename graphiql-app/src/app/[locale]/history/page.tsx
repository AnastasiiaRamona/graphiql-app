'use client';

import EmptyStorage from '@/components/EmptyStorage/EmptyStorage';
import HistoryStorage from '@/components/HistoryStorage/HistoryStorage';
import Loader from '@/components/Loader/Loader';
import useCheckingOfAuthorization from '@/hooks/useCheckingOfAuthorization';
import { Box, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import HistoryTwoToneIcon from '@mui/icons-material/HistoryTwoTone';

const History = () => {
  const [history, setHistory] = useState<string | null>(null);
  const locale = useTranslations();

  useEffect(() => {
    const storedHistory = localStorage.getItem('queryHubHistory');
    setHistory(storedHistory);
  }, []);

  const { loading, isAuthenticated } = useCheckingOfAuthorization();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (history === null) {
    return <EmptyStorage />;
  }

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={'row'}
        gap={1}
        mt="10vh"
        mb="3vh"
      >
        <Typography variant="h4" component="h1" fontWeight={500}>
          {locale('history')}
        </Typography>
        <HistoryTwoToneIcon sx={{ fontSize: '2rem' }} />
      </Box>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '65vh',
          width: '100vw',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          mb: '10vh',
        }}
      >
        <HistoryStorage requests={JSON.parse(history)} />
      </Container>
    </>
  );
};
export default History;
