import { ErrorComponent } from '@components/ErrorBoundary/ErrorComponent';
import { ErrorButton } from '@components/ErrorButton/ErrorButton';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { ThemeProvider } from '@contexts/themeProvider';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from '@remix-run/react';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './styles/index.scss';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <Outlet />
        <Footer />
        <ErrorButton />
        <ToastContainer position="top-center" autoClose={2000} className="Toastify" />
      </ThemeProvider>
    </Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.error('LOG: This error was caught by Error Boundary', error);

  return (
    <html lang="en">
      <head>
        <title>Oh no! Error!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorComponent />
        <Scripts />
      </body>
    </html>
  );
}
