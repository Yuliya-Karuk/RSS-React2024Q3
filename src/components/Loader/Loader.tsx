import loader from '@assets/loader.gif';
import styles from './Loader.module.scss';

interface LoaderProps {
  style?: React.CSSProperties;
}

export const Loader = ({ style }: LoaderProps) => (
  <div className={styles.loaderContainer}>
    <img className={styles.loader} src={loader} alt="Loader" style={style} />
  </div>
);
