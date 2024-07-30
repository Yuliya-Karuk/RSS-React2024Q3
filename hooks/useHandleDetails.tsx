import { useRouter } from 'next/router';

export const useHandleDetails = () => {
  const router = useRouter();

  const closeDetails = () => {
    const newQuery = { ...router.query };
    delete newQuery.details;

    router.push({ pathname: router.pathname, query: newQuery });
  };

  const openDetails = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
    characterId: string
  ) => {
    e.stopPropagation();

    const newQuery = { ...router.query };
    newQuery.details = characterId;

    router.push({ pathname: router.pathname, query: newQuery });
  };

  return { closeDetails, openDetails };
};
