import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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

  useEffect(() => {
    if (router.query.query !== getStorage()) {
      const newQuery = {
        page: '1',
        query: getStorage(),
        ...(router.query.details && { details: router.query.details }),
      };
      router.push({ pathname: router.pathname, query: newQuery });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { searchValue, handleInputChange, handleSubmit };
};
