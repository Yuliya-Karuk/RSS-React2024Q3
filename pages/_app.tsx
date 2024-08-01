import { MainLayout } from '@components/MainLayout/MainLayout';
import { ThemeProvider } from '@contexts/themeProvider';
import { wrapper } from '@store/store';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import '../styles/index.scss';

export default function MyApp({ Component, ...pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="RS School React Task" />
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="32x32" />
        <title>Star Wars Search</title>
      </Head>
      <ThemeProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </Provider>
  );
}
