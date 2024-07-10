import logo from '@assets/logo.png';
import { Search } from '@components/Search/Search';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerContainer}>
      <Link
        to="/"
        className={styles.logoLink}
        onClick={() => {
          document.body.classList.remove('lock');
        }}
      >
        <img className={styles.logo} src={logo} alt="Logo" />
      </Link>
      <Search />
    </div>
  </header>
);
