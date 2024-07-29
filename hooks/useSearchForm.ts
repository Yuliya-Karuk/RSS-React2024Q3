import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useLocalStorage } from './useLocalStorage';

export const useSearchForm = (inputRef: React.RefObject<HTMLInputElement>) => {
  const { getStorage, setStorage } = useLocalStorage();
  const [searchValue, setSearchValue] = useState(getStorage() || '');
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.blur();
    }

    setStorage(searchValue);
    const params = new URLSearchParams(location.search);
    params.set('page', '1');
    navigate(`/?${params.toString()}`);
  };

  useEffect(() => {
    const searchQuery = getStorage() || '';
    setSearchValue(searchQuery);
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return { searchValue, handleInputChange, handleSubmit };
};
