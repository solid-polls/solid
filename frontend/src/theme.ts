import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0093c8',
    },
    secondary: {
      main: '#00b167',
    },
    background: {
      default: '#222222',
    },
  },
  spacing: 8,
});

export default theme;
