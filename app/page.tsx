import Home from '@components/Home/Home';
import { Loader } from '@components/Loader/Loader';
import { Suspense } from 'react';
import styles from './page.module.scss';

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <Suspense
      key={`${searchParams.page}_${searchParams.query}`}
      fallback={
        <div className={styles.page}>
          <Loader />
        </div>
      }
    >
      <Home searchParams={searchParams} />
    </Suspense>
  );
}
