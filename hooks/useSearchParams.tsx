import { checkTypesSearchParams } from '@utils/utils';
import { useRouter } from 'next/router';

export const useSearchParams = () => {
  const router = useRouter();
  const { page, query, details } = router.query;

  const { searchDetails, currentPage, searchQuery } = checkTypesSearchParams({ page, query, details });

  // useEffect(() => {
  //   const newQuery = { page: currentPage, query: searchQuery, details: searchDetails };
  //   router.push({ pathname: router.pathname, query: newQuery });
  // }, []);

  return { searchDetails, currentPage, searchQuery };
};
