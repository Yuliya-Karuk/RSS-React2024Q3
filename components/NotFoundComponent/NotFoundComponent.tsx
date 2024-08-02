import Link from 'next/link';
import styles from './notFoundComponent.module.scss';

export default function NotFoundComponent() {
  return (
    <div className={styles.notFound}>
      <img className={styles.notFoundImage} src="/images/404.png" alt="Icon Not Found" />
      <Link className={styles.notFoundLink} href="/">
        Back to Home page
      </Link>
    </div>
  );
}
