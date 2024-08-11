import { useSearchParams } from '@remix-run/react';

export const useHandleDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const closeDetails = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    setSearchParams(params);
  };

  const openDetails = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
    characterId: string
  ) => {
    e.stopPropagation();
    const params = new URLSearchParams(searchParams.toString());

    params.set('details', characterId);
    setSearchParams(params);
  };

  return { closeDetails, openDetails };
};
