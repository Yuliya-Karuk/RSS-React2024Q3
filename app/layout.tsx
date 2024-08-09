/* eslint-disable react-refresh/only-export-components */

import { ErrorButton } from '@components/ErrorButton/ErrorButton';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Loader } from '@components/Loader/Loader';
import { ThemeProvider } from '@contexts/themeProvider';
import '@styles/index.scss';
import { Metadata } from 'next/types';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
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
            <Suspense key="main" fallback={<Loader />}>
              <div className="wrapper">
                <Header />
                {children}
                <Footer />
                <ErrorButton />
                <ToastContainer position="top-center" autoClose={2000} className="Toastify" />
              </div>
            </Suspense>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
