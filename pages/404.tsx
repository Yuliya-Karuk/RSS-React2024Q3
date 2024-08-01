import styles from '@styles/notFound.module.scss';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <img className={styles.notFoundImage} src="/images/404.png" alt="Icon Not Found" />
      <Link className={styles.notFoundLink} href="/">
        Back to Home page
      </Link>
    </div>
  );
}
