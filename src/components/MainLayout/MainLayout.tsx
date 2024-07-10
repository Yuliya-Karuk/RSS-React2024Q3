import { ErrorButton } from '@components/ErrorButton/ErrorButton';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
    <ErrorButton />
  </>
);
