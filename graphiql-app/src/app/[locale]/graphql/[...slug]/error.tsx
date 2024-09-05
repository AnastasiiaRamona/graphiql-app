'use client';

import Link from 'next/link';
import { Container, Typography } from '@mui/material';

export default function Error() {
  return (
    <Container sx={{ textAlign: 'center' }} maxWidth="md" component="main">
      <Typography component="h1" variant="h3" gutterBottom>
        ERROR PAGE
      </Typography>

      <Link className="Link" href="welcome">
        Go to welcome
      </Link>
    </Container>
  );
}
