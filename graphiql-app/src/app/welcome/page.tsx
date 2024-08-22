import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

const WelcomePage = () => {
  return (
    <main>
      <Box width={'70%'}>
        <Typography variant="h1" component="h2" sx={{ fontSize: '3rem' }}>
          Welcome to the GraphiQL App!
        </Typography>
        <Typography variant="h2" component="h2" sx={{ fontSize: '2rem' }}>
          Happy querying!
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
        <p>Not signed in yet?</p>
        <Link href="/authorization">
          <Button variant="contained">Sing in</Button>
        </Link>
        <Link href="/authorization">
          <Button variant="contained">Sing up</Button>
        </Link>
      </Box>
    </main>
  );
};

export default WelcomePage;
