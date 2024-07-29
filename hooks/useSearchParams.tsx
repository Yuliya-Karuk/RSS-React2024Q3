import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useSearchParams = () => {
  const [searchDetails, setSearchDetails] = useState<string>('');
  const { getStorage } = useLocalStorage();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(getStorage() || '');

  useEffect(() => {
    const getParams = () => {
      const params = new URLSearchParams(window.location.search);
      const query = getStorage() || '';
      const page = params.get('page') || '1';
      const details = params.get('details') || '';

      setCurrentPage(+page);
      setSearchQuery(query);
      setSearchDetails(details);
    };

    getParams();
  }, [getStorage]);

  return { searchDetails, currentPage, searchQuery };
};
