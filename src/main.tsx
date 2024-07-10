import { DataProvider } from '@contexts/dataProvider.tsx';
import { ToastProvider } from '@contexts/toastProvider.tsx';
import { AppRouter } from '@router/router.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import './styles/index.scss';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <DataProvider>
          <AppRouter />
        </DataProvider>
      </ToastProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
