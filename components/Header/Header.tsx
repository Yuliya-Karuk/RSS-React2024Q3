import { Search } from '@components/Search/Search';
import { ThemeSwitcher } from '@components/ThemeSwitcher/ThemeSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerContainer}>
      <Link href="/" className={styles.logoLink}>
        <Image className={styles.logo} src="/images/logo.png" alt="Logo" width={721} height={337} />
      </Link>
      <Search />
      <ThemeSwitcher />
    </div>
  </header>
);
