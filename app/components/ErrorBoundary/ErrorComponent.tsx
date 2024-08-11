import { Link } from '@remix-run/react';
import errorImg from '../../assets/images/error.png';
import styles from './ErrorComponent.module.scss';

export function ErrorComponent() {
  return (
    <div className={styles.errorPage}>
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h2 className={styles.errorHeading}>Something went wrong. Refresh the page, please.</h2>
          <Link to="/" className={styles.errorButton}>
            Reload
          </Link>
        </div>
        <div className={styles.errorImgContainer}>
          <img className={styles.errorImg} src={errorImg} alt="Error" />
        </div>
      </div>
    </div>
  );
}
