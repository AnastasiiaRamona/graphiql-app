import Link from 'next/link';
import { Container, Typography } from '@mui/material';

export default function GraphQLPage() {
  return (
    <Container sx={{ textAlign: 'center' }} maxWidth="md" component="main">
      <Typography component="h1" variant="h1" gutterBottom>
        GraphQL
      </Typography>
      <Typography component="p" variant="h6" gutterBottom sx={{ mb: 2 }}>
        Make your first request GraphQL
      </Typography>

      <Link
        className="Link"
        href="graphql/aHR0cHM6Ly9ncmFwaHFsemVyby5hbG1hbnNpLm1lL2FwaQ==/cXVlcnkgUXVlcnkoJGlkOiBJRCEpIHsKICAgdXNlcihpZDogJGlkKSB7CiAgICAgIHVzZXJuYW1lCiAgICAgIG5hbWUKICAgIH0KICB9/eyAiaWQiOiAiMSIgfQ=="
      >
        GO TO
      </Link>
    </Container>
  );
}
