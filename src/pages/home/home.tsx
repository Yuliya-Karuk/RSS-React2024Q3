import { CharacterList } from '@components/CharacterList/CharacterList';
import { Loader } from '@components/Loader/Loader';
import { Pagination } from '@components/Pagination/Pagination';
import { useTheme } from '@contexts/themeProvider';
import { useSearchParams } from '@hooks/useSearchParams';
import { useAppDispatch } from '@hooks/useStoreHooks';
import classnames from 'classnames';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useSearchPeopleQuery } from 'src/store/api/swapiApi';
import { setCharacters } from 'src/store/charactersSlice';
import { selectCharacters, selectTotalPages } from 'src/store/selectors';
import styles from './home.module.scss';

export const Home = () => {
  const { searchDetails, currentPage, searchQuery } = useSearchParams();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const { data, isLoading, isFetching } = useSearchPeopleQuery({
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

  if (isLoading || isFetching) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  return (
    <main className={classnames(styles.page, { [styles.light]: theme === 'light' })}>
      <div className={styles.container}>
        {characters && (
          <div className={styles.leftContainer}>
            <CharacterList characters={characters} isDetailsOpen={Boolean(searchDetails)} />
            {currentPage && <Pagination currentPage={currentPage} totalPages={totalPages} />}
          </div>
        )}
        {Boolean(searchDetails) && <Outlet />}
      </div>
    </main>
  );
};
