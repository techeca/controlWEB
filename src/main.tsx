import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './contexts/ThemeProvider.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </ThemeProvider>
)
