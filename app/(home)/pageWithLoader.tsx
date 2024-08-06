import { Loader } from '@components/Loader/Loader';
import { Suspense } from 'react';
import Home from './pageHome';

export default async function PageWithLoader({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <Suspense key="characters" fallback={<Loader />}>
      <Home searchParams={searchParams} />
    </Suspense>
  );
}
