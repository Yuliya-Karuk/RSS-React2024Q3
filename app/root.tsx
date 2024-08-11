/* eslint-disable react-refresh/only-export-components */
import { ErrorComponent } from '@components/ErrorBoundary/ErrorComponent';
import { ErrorButton } from '@components/ErrorButton/ErrorButton';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { NotFound } from '@components/NotFound/notFound';
import { ThemeProvider } from '@contexts/themeProvider';
import { LinksFunction } from '@remix-run/node';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './styles/index.scss';

export const meta: MetaFunction = () => [
  { title: 'Star Wars Search' },
  { name: 'description', content: 'RS School React Tas' },
];

export const links: LinksFunction = () => [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }];

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

  if (isRouteErrorResponse(error)) {
    return <NotFound />;
  }

  console.error('LOG: This error was caught by Error Boundary', error);

  return <ErrorComponent />;
}
