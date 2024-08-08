import { useState } from 'react';
import styles from './ErrorButton.module.scss';

export const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('The site is broken!');
  }

  return (
    <button type="button" className={styles.errorButton} onClick={throwError}>
      Destroy the World
    </button>
  );
};
