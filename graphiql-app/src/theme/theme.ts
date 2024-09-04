'use client';

import blue from '@mui/material/colors/blue';
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1c54b2',
    },
    secondary: {
      main: '#F0F8FF',
    },
    text: {
      primary: blue[900],
      secondary: '#fff',
    },
    background: {
      default:
        'linear-gradient(135deg, rgb(204, 226, 246), rgb(146, 189, 215))',
      paper: 'white',
    },
  },
  typography: {
    fontFamily: 'var(--primary-font-family)',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: blue[700],
    },
    text: {
      primary: blue[100],
      secondary: '#fff',
    },
    background: {
      default:
        'linear-gradient(135deg, rgba(66, 74, 81, 0.911), rgb(30, 54, 105))',
      paper: '#313233',
    },
  },
  typography: {
    fontFamily: 'var(--primary-font-family)',
  },
});

export { lightTheme, darkTheme };
