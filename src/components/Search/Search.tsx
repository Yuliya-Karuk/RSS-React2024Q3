import { DataContext } from '@contexts/dataProvider';
import { api } from '@services/api';
import { storage } from '@services/storage';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import styles from './Search.module.scss';

export const Search = () => {
  const { data, updateData } = useContext(DataContext);
  const [searchValue, setSearchValue] = useState(storage.getStorage() || '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    storage.setStorage(searchValue);
  };

  const updateSearchData = async () => {
    updateData(data, true);
    const newData = await api.searchPeopleByName(searchValue);
    updateData(newData, false);
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
