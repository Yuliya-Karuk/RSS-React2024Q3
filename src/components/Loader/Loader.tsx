import loader from '@assets/loader.gif';
import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loaderContainer}>
    <img className={styles.loader} src={loader} alt="Loader" />
  </div>
);
