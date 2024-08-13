import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './router/router';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
