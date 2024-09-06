import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <main>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    </main>
  );
}
