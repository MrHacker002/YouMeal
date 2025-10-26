import Layout from './components/Layout';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/400.css';
function App() {


  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;