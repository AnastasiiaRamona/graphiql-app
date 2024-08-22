'use client';

import blue from '@mui/material/colors/blue';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c54b2',
    },
    secondary: {
      main: '#F0F8FF',
    },
    text: {
      primary: blue[700],
    },
  },
  typography: {
    fontFamily: 'var(--primary-font-family)',
  },
});

export default theme;
