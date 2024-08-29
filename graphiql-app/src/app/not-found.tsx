import { Container, Typography, Box } from '@mui/material';
import Link from 'next/link';

function NotFound() {
  return (
    <Container
      component="main"
      sx={{
        textAlign: 'center',
        marginTop: '10%',
        color: '#616161',
      }}
    >
      <Typography variant="h1" component="h1" fontSize={'180px'}>
        404
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        sx={{ marginBottom: 2 }}
        fontSize={'50px'}
      >
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }} fontSize={'20px'}>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Box>
        <Link href="/" passHref className="NotFound-Link">
          Go to Homepage
        </Link>
      </Box>
    </Container>
  );
}

export default NotFound;
