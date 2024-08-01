import { MainLayout } from '@components/MainLayout/MainLayout';
import { ThemeProvider } from '@contexts/themeProvider';
import { wrapper } from '@store/store';
import type { AppProps } from 'next/app';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </ThemeProvider>
);

export default wrapper.withRedux(MyApp);
