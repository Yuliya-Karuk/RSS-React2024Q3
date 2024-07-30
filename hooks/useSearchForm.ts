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
    const params = new URLSearchParams(router.query as Record<string, string>);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  useEffect(() => {
    setSearchValue(getStorage() || '');
  }, [getStorage]);

  return { searchValue, handleInputChange, handleSubmit };
};
