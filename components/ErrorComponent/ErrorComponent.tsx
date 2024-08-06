import Image from 'next/image';
import styles from './ErrorComponent.module.scss';

export const ErrorComponent = () => {
  const onReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.errorPage}>
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h2 className={styles.errorHeading}>Something went wrong. Refresh the page, please.</h2>
          <button type="button" className={styles.errorButton} onClick={onReload}>
            Reload
          </button>
        </div>
        <div className={styles.errorImgContainer}>
          <Image className={styles.errorImg} src="/images/error.png" alt="Error" width={400} height={600} />
        </div>
      </div>
    </div>
  );
};
