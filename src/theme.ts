import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Nunito', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'].join(', '),
  },
  palette: {
    mode: 'light',
    primary: { main: '#FF7020' },
    secondary: { main: '#FFAA20' },
  },
});

export default theme;
