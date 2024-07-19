import { DataProvider } from '@contexts/dataProvider.tsx';
import { ToastProvider } from '@contexts/toastProvider.tsx';
import { AppRouter } from '@router/router.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { store } from './store/store.ts';
import './styles/index.scss';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ToastProvider>
          <DataProvider>
            <AppRouter />
          </DataProvider>
        </ToastProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
