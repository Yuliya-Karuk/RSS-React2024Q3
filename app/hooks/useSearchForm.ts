import { useSearchParams } from '@remix-run/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useSearchForm = (inputRef: React.RefObject<HTMLInputElement>) => {
  const { getStorage, setStorage } = useLocalStorage();
  const [searchValue, setSearchValue] = useState<string>(getStorage() || '');
  const [searchParams, setSearchParams] = useSearchParams();
  const details = searchParams.get('details');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.blur();
    }

    setStorage(searchValue);
    setSearchParams({ page: '1', query: searchValue, ...(details && { details }) });
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if ((params && params.get('search')) !== getStorage()) {
      setSearchParams({ page: '1', query: searchValue, ...(details && { details }) });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { searchValue, handleInputChange, handleSubmit };
};
