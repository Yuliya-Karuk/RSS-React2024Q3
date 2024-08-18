import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout/MainLayout';
import { ControlledForm } from '../pages/controlledForm/controlledForm';
import { Home } from '../pages/home/home';
import { UncontrolledForm } from '../pages/uncontrolledForm/uncontrolledForm';
import { AppRoutes } from './routes';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
        <Route path={AppRoutes.CONTROLLED_ROUTE} element={<ControlledForm />} />
        <Route path={AppRoutes.UNCONTROLLED_ROUTE} element={<UncontrolledForm />} />
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
);
