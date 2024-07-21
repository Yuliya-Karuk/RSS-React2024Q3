const storageKey = 'karuk_star_wars';

export const useLocalStorage = () => {
  const setStorage = (searchValue: string): void => {
    localStorage.setItem(storageKey, JSON.stringify(searchValue));
  };

  const getStorage = (): string | null => {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : null;
  };

  const removeStorage = (): void => {
    localStorage.removeItem(storageKey);
  };

  return { setStorage, getStorage, removeStorage };
};
