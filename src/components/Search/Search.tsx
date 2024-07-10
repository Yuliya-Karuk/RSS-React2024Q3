import { useData } from '@contexts/dataProvider';
import { useLocalStorage } from '@hooks/useSearchQuery';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Search.module.scss';

export const Search = () => {
  const { searchQuery, setSearchQuery } = useData();
  const [searchValue, setSearchValue] = useState(searchQuery);
  const { setStorage } = useLocalStorage();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
  };

  const updateSearchData = async () => {
    setStorage(searchValue);
    setSearchQuery(searchValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearchData();
  };

  return (
    <div className={styles.searchContainer}>
      <form noValidate method="" className={styles.search} onSubmit={handleSubmit}>
        <input
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
