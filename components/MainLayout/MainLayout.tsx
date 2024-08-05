import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);
