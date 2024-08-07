const storageKey = 'karuk_star_wars';

export const useLocalStorage = () => {
  const isClient = typeof window !== 'undefined';

  const setStorage = (searchValue: string): void => {
    if (isClient) {
      window.localStorage.setItem(storageKey, JSON.stringify(searchValue));
    }
  };

  const getStorage = (): string | null => {
    if (isClient) {
      const data = window.localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : null;
    }
    return null;
  };

  const removeStorage = (): void => {
    if (isClient) {
      window.localStorage.removeItem(storageKey);
    }
  };

  return { setStorage, getStorage, removeStorage };
};
