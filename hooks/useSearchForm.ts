import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useSearchForm = (inputRef: React.RefObject<HTMLInputElement>) => {
  const router = useRouter();
  const { getStorage, setStorage } = useLocalStorage();
  const [searchValue, setSearchValue] = useState<string>(getStorage() || '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.blur();
    }

    setStorage(searchValue);
    const newQuery = { page: '1', query: searchValue, ...(router.query.details && { details: router.query.details }) };
    router.push({ pathname: router.pathname, query: newQuery });
  };

  return { searchValue, handleInputChange, handleSubmit };
};
