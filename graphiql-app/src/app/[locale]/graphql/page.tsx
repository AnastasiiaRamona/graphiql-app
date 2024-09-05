import Link from 'next/link';
import { Container, Typography } from '@mui/material';

export default function GraphQLPage() {
  return (
    <Container sx={{ textAlign: 'center' }} maxWidth="md" component="main">
      <Typography component="h1" variant="h3" gutterBottom>
        GraphQL
      </Typography>
      <Typography component="p" variant="h6" gutterBottom sx={{ mb: 2 }}>
        Make your first request GraphQL
      </Typography>

      <Link
        className="Link"
        href="graphql/aHR0cHM6Ly9ncmFwaHFsemVyby5hbG1hbnNpLm1lL2FwaQ==/cXVlcnkgQWxidW0oJGlkOiBJRCEpIHsKICBhbGJ1bShpZDogJGlkKSB7CiAgICBpZAogICAgdGl0bGUKICB9Cn0K%7CewogICJpZCI6ICIxIgp9"
      >
        GO TO
      </Link>
    </Container>
  );
}
