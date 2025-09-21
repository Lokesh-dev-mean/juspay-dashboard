import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeModeContext';
import { SidebarProvider } from './context/SidebarContext'; 
import CssBaseline from '@mui/material/CssBaseline';
import { routes } from './routes';

function AppContent() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SidebarProvider>
            <CssBaseline />
            <AppContent />
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;