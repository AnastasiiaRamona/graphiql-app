import useAuthStore from '@/store/store';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

const AuthorizationButtons = () => {
  const { setForm } = useAuthStore();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        fontSize: '1rem',
      }}
    >
      <p>Not signed in/on yet?</p>
      <Link href="/authorization">
        <Button variant="contained" onClick={() => setForm(true)}>
          Sing in
        </Button>
      </Link>
      <Link href="/authorization">
        <Button variant="contained" onClick={() => setForm(false)}>
          Sing up
        </Button>
      </Link>
    </Box>
  );
};

export default AuthorizationButtons;
