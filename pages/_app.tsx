import { MainLayout } from '@components/MainLayout/MainLayout';
import { ThemeProvider } from '@contexts/themeProvider';
import { store } from '@store/store';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <ThemeProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  </Provider>
);

export default MyApp;
