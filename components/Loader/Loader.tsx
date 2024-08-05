import Image from 'next/image';
import styles from './Loader.module.scss';

interface LoaderProps {
  style?: React.CSSProperties;
}

export const Loader = ({ style }: LoaderProps) => (
  <div className={styles.loaderContainer}>
    <Image className={styles.loader} src="/loader.gif" alt="Loader" style={style} width={480} height={360} />
  </div>
);
