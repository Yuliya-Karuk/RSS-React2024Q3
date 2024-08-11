import { useHandleDetails } from '@hooks/useHandleDetails';
import styles from './CloseDetailsButton.module.scss';

export const CloseDetailsButton = () => {
  const { closeDetails } = useHandleDetails();

  return (
    <button type="button" className={styles.closeButton} aria-label="Close details" onClick={() => closeDetails()}>
      <span className={styles.closeIcon} />
    </button>
  );
};
