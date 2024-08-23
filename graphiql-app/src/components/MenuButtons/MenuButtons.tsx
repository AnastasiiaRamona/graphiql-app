import { Box, Button } from '@mui/material';
import Link from 'next/link';

const MenuButtons = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        fontSize: '1rem',
      }}
    >
      <p>Choose One</p>
      <Link href="/RESTfull">
        <Button variant="contained">REST Client</Button>
      </Link>
      <Link href="/GraphiQL">
        <Button variant="contained">GraphiQL Client</Button>
      </Link>
      <Link href="/history">
        <Button variant="contained">History</Button>
      </Link>
    </Box>
  );
};

export default MenuButtons;
