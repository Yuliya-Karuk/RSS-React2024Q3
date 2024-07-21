import { CharacterList } from '@components/CharacterList/CharacterList';
import { Loader } from '@components/Loader/Loader';
import { Pagination } from '@components/Pagination/Pagination';
import { useTheme } from '@contexts/themeProvider';
import { useLocalStorage } from '@hooks/useSearchQuery';
import { useAppDispatch } from '@hooks/useStoreHooks';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { useSearchPeopleQuery } from 'src/store/api/swapiApi';
import { setCharacters } from 'src/store/charactersSlice';
import { selectCharacters, selectTotalPages } from 'src/store/selectors';
import styles from './home.module.scss';

export const Home = () => {
  const [searchDetails, setSearchDetails] = useState<string>('');
  const dispatch = useAppDispatch();
  const { getStorage } = useLocalStorage();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(getStorage() || '');
  const location = useLocation();
  const { theme } = useTheme();

  const { data, isLoading } = useSearchPeopleQuery({
    searchValue: searchQuery,
    page: currentPage,
  });

  const characters = useSelector(selectCharacters);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    if (data) {
      dispatch(setCharacters(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const getParams = () => {
      const params = new URLSearchParams(location.search);
      const query = getStorage() || '';
      const page = params.get('page') || '1';
      const details = params.get('details') || '';

      setCurrentPage(+page);
      setSearchQuery(query);
      setSearchDetails(details);
    };

    getParams();
  }, [getStorage, location.search]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  return (
    <main className={classnames(styles.page, { [styles.light]: theme === 'light' })}>
      <div className={styles.container}>
        {characters && characters.length > 0 ? (
          <div className={styles.leftContainer}>
            <CharacterList characters={characters} isDetailsOpen={Boolean(searchDetails)} />
            {currentPage && <Pagination currentPage={currentPage} totalPages={totalPages} />}
          </div>
        ) : (
          <div className={styles.emptySearch}>Sorry, we couldn`t find anything matching your search.</div>
        )}
        {Boolean(searchDetails) && <Outlet />}
      </div>
    </main>
  );
};
