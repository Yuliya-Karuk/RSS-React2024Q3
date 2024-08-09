import { Loader } from '@components/Loader/Loader';
import { Suspense } from 'react';

interface DetailsWithLoaderProps {
  children: React.ReactNode;
}

export default async function HomeWithLoader({ children }: DetailsWithLoaderProps) {
  return (
    <Suspense key="characters" fallback={<Loader />}>
      {children}
    </Suspense>
  );
}
