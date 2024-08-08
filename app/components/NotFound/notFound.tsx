import notFoundImage from '@assets/images/404.png';
import { Link } from '@remix-run/react';
import styles from './notFound.module.scss';

export function NotFound() {
  return (
    <div className={styles.notFound}>
      <img className={styles.notFoundImage} src={notFoundImage} alt="Icon Not Found" />
      <Link to="/" className={styles.notFoundLink} reloadDocument>
        Back to Home page
      </Link>
    </div>
  );
}
