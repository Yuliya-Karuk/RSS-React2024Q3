import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

export const useSearchParams = () => {
  const [searchDetails, setSearchDetails] = useState<string>('');
  const { getStorage } = useLocalStorage();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(getStorage() || '');
  const location = useLocation();

  useEffect(() => {
    const getParams = () => {
      const params = new URLSearchParams(location.search);
      const query = getStorage() || '';
      const page = params.get('page') || '1';
      const details = params.get('details') || '';

      setCurrentPage(+page);
      setSearchQuery(query);
      setSearchDetails(details);
    };

    getParams();
  }, [getStorage, location.search]);

  return { searchDetails, currentPage, searchQuery };
};
