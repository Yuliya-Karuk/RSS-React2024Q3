'use client';

import styles from './ErrorButton.module.scss';

export const ErrorButton = () => {
  const throwError = () => {
    throw new Error('The site is broken!');
  };

  return (
    <button type="button" className={styles.errorButton} onClick={throwError}>
      Destroy the World
    </button>
  );
};
