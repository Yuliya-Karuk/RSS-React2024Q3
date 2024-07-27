import { useSearchForm } from '@hooks/useSearchForm';
import { useRef } from 'react';
import styles from './Search.module.scss';

export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchValue, handleInputChange, handleSubmit } = useSearchForm(inputRef);

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
