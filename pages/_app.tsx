import { ThemeProvider } from '@contexts/themeProvider';
import { store } from '@store/store';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../styles/index.scss';


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;