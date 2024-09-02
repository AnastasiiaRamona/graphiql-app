import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
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
};

export default Loader;
