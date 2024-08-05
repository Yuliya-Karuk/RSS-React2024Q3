/* eslint-disable react-refresh/only-export-components */

import { ErrorButton } from '@components/ErrorButton/ErrorButton';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { FilmsProvider } from '@contexts/filmsProvaider';
import { ThemeProvider } from '@contexts/themeProvider';
import '@styles/index.scss';
import { Metadata } from 'next/types';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import Loading from './loading';
import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  title: 'Star Wars Search',
  description: 'RS School React Task',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>
            <FilmsProvider>
              <Suspense fallback={<Loading />}>
                <Header />
                {children}
                <Footer />
                <ErrorButton />
                <ToastContainer position="top-center" autoClose={2000} className="Toastify" />
              </Suspense>
            </FilmsProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
