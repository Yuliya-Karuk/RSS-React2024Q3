import { ErrorButton } from '@components/ErrorButton/ErrorButton';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
    <ErrorButton />
    <ToastContainer position="top-center" autoClose={2000} className="Toastify" />
  </>
);
