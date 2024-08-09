'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useSearchForm = (inputRef: React.RefObject<HTMLInputElement>) => {
  const router = useRouter();
  const { getStorage, setStorage } = useLocalStorage();
  const [searchValue, setSearchValue] = useState<string>(getStorage() || '');
  const searchParams = useSearchParams();
  const details = searchParams && searchParams.get('details');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.blur();
    }

    setStorage(searchValue);

    const newQuery = new URLSearchParams({
      page: '1',
      query: searchValue,
      ...(details && { details }),
    }).toString();

    router.push(`?${newQuery}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());

    if ((params && params.get('search')) !== getStorage()) {
      params.set('query', searchValue);

      if (!params.get('page')) {
        params.set('page', '1');
      }

      router.push(`?${params.toString()}`);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { searchValue, handleInputChange, handleSubmit };
};
