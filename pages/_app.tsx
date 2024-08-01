import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { Loader } from '@components/Loader/Loader';
import { MainLayout } from '@components/MainLayout/MainLayout';
import { ThemeProvider } from '@contexts/themeProvider';
import { wrapper } from '@store/store';
import '@styles/index.scss';
import styles from '@styles/loader.module.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

export default function MyApp({ Component, ...pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const start = () => {
    setIsLoading(true);
  };

  const end = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <Head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="RS School React Task" />
        <link rel="icon" href="/favicon.ico" type="image/ico" sizes="32x32" />
        <title>Star Wars Search</title>
      </Head>
      <ErrorBoundary>
        <ThemeProvider>
          <MainLayout>
            {isLoading ? (
              <div className={styles.page}>
                <Loader />
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </MainLayout>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}
