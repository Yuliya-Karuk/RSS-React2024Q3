import { checkTypesSearchParams } from '@utils/utils';
import { useRouter } from 'next/router';

export const useSearchParams = () => {
  const router = useRouter();
  const { page, query, details } = router.query;

  const { searchDetails, currentPage, searchQuery } = checkTypesSearchParams({ page, query, details });

  return { searchDetails, currentPage, searchQuery };
};
