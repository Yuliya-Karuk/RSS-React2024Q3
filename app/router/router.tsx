import { Details } from '@components/Details/Details';
import { MainLayout } from '@components/MainLayout/MainLayout';
import { Home } from '@pages/home/home';
import { NotFound } from '@pages/notFound/notFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={AppRoutes.HOME_ROUTE} element={<Home />}>
          <Route path={AppRoutes.HOME_ROUTE} element={<Details />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
