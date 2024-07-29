import { Search } from '@components/Search/Search';
import { ThemeSwitcher } from '@components/ThemeSwitcher/ThemeSwitcher';
import Link from 'next/link';
import styles from './Header.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerContainer}>
      <Link href="/" className={styles.logoLink}>
        <img className={styles.logo} src='/images/logo.png' alt="Logo" />
      </Link>
      <Search />
      <ThemeSwitcher />
    </div>
  </header>
);
