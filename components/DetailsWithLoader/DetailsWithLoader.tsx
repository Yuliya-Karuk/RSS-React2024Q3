import { Loader } from '@components/Loader/Loader';
import { Suspense } from 'react';

interface DetailsWithLoaderProps {
  children: React.ReactNode;
}

export default async function DetailsWithLoader({ children }: DetailsWithLoaderProps) {
  return (
    <Suspense key="details" fallback={<Loader />}>
      {children}
    </Suspense>
  );
}
