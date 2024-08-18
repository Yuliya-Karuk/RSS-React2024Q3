import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppRouter } from './router/router';
import { store } from './store/store';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);
