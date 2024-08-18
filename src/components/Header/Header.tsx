import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AppRoutes } from '../../router/routes';
import styles from './Header.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerContainer}>
      <Link to={AppRoutes.CONTROLLED_ROUTE} className={styles.headerLink}>
        Controlled From
      </Link>
      <Link to={AppRoutes.HOME_ROUTE} className={styles.logoLink}>
        <img className={styles.logo} src={logo} alt="Logo" />
      </Link>
      <Link to={AppRoutes.UNCONTROLLED_ROUTE} className={styles.headerLink}>
        Uncontrolled From
      </Link>
    </div>
  </header>
);
