'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const useHandleDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const closeDetails = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('details');

    router.push(`?${params.toString()}`);
  };

  const openDetails = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
    characterId: string
  ) => {
    e.stopPropagation();

    const params = new URLSearchParams(searchParams?.toString());

    params.set('details', characterId);

    router.push(`?${params.toString()}`);
  };

  return { closeDetails, openDetails };
};
