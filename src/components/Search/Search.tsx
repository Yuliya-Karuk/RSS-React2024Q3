import { useLocalStorage } from '@hooks/useSearchQuery';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Search.module.scss';

export const Search = () => {
  const { getStorage, setStorage } = useLocalStorage();
  const [searchValue, setSearchValue] = useState(getStorage() || '');
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

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
    const params = new URLSearchParams({ search: searchValue, page: '1' });
    navigate(`/?${params.toString()}`);
  };

  useEffect(() => {
    const setSearchInput = () => {
      const params = new URLSearchParams(location.search);
      const searchQuery = params.get('search') || '';

      setSearchValue(searchQuery);
    };

    setSearchInput();
  }, [location.search]);

  return (
    <div className={styles.searchContainer}>
      <form noValidate method="" className={styles.search} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={styles.searchInput}
          required
          type="text"
          placeholder="SEARCH ..."
          value={searchValue}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.searchIcon} aria-label="search button" />
      </form>
    </div>
  );
};
