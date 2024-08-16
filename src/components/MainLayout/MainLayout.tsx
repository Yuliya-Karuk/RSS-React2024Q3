import { Outlet } from 'react-router-dom';
import '../../styles/index.scss';
import { Header } from '../Header/Header';
import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <div className={styles.page}>
        <Outlet />
      </div>
    </>
  );
};
