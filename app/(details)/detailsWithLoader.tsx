import { Details } from '@components/Details/Details';
import { Loader } from '@components/Loader/Loader';
import { Suspense } from 'react';

export default async function DetailsWithLoader({ id }: { id: string }) {
  return (
    <Suspense key="details" fallback={<Loader />}>
      <Details id={id} />
    </Suspense>
  );
}
