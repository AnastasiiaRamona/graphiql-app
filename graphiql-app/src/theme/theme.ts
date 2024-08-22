'use client';

import blue from '@mui/material/colors/blue';
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

export { lightTheme, darkTheme };

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1c54b2',
//     },
//     secondary: {
//       main: '#F0F8FF',
//     },
//     text: {
//       primary: blue[900],
//     },
//   },
//   typography: {
//     fontFamily: 'var(--primary-font-family)',
//   },
// });

// export default theme;
