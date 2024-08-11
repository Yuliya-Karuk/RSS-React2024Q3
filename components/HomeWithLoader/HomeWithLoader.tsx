import { Loader } from '@components/Loader/Loader';
import { Suspense } from 'react';
import styles from './HomeWithLoader.module.scss';

interface DetailsWithLoaderProps {
  children: React.ReactNode;
}

export default async function HomeWithLoader({ children }: DetailsWithLoaderProps) {
  return (
    <Suspense
      key="characters"
      fallback={
        <div className={styles.page}>
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
