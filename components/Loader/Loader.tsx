import styles from './Loader.module.scss';

interface LoaderProps {
  style?: React.CSSProperties;
}

export const Loader = ({ style }: LoaderProps) => (
  <div className={styles.loaderContainer}>
    <img className={styles.loader} src="/loader.gif" alt="Loader" style={style} />
  </div>
);
