import { ErrorButton } from '@components/ErrorButton/ErrorButton';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export const MainLayout = () => (
  <>
    <Header />
    <Footer />
    <ErrorButton />
    <ToastContainer position="top-center" autoClose={2000} className="Toastify" />
  </>
);
