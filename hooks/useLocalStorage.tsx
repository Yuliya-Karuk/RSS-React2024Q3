const storageKey = 'karuk_star_wars';

export const useLocalStorage = () => {
  // Проверяем наличие `window`, чтобы убедиться, что код выполняется на клиенте
  const isClient = typeof window !== 'undefined';

  // Функция для установки значения в localStorage
  const setStorage = (searchValue: string): void => {
    if (isClient) {
      window.localStorage.setItem(storageKey, JSON.stringify(searchValue));
    }
  };

  // Функция для получения значения из localStorage
  const getStorage = (): string | null => {
    if (isClient) {
      const data = window.localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : null;
    }
    return null;
  };

  // Функция для удаления значения из localStorage
  const removeStorage = (): void => {
    if (isClient) {
      window.localStorage.removeItem(storageKey);
    }
  };

  return { setStorage, getStorage, removeStorage };
};
