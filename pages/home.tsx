import { CharacterList } from '@components/CharacterList/CharacterList';
import { Favorites } from '@components/Favorites/Favorites';
import { Loader } from '@components/Loader/Loader';
import { Pagination } from '@components/Pagination/Pagination';
import { useTheme } from '@contexts/themeProvider';
import { useSearchParams } from '@hooks/useSearchParams';
import { useAppDispatch } from '@hooks/useStoreHooks';
import { useSearchPeopleQuery } from '@store/api/swapiApi';
import { setCharacters } from '@store/charactersSlice';
import { selectCharacters, selectFavorites, selectTotalPages } from '@store/selectors';
import styles from '@styles/home.module.scss';
import classnames from 'classnames';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { searchDetails, currentPage, searchQuery } = useSearchParams();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const { data, isLoading, isFetching } = useSearchPeopleQuery({
    searchValue: searchQuery,
    page: currentPage,
  });

  const characters = useSelector(selectCharacters);
  const totalPages = useSelector(selectTotalPages);
  const favorites = useSelector(selectFavorites);

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
        {/* {Boolean(searchDetails) && <Outlet />} */}
      </div>
      {favorites.length > 0 && <Favorites favorites={favorites} />}
    </main>
  );
};

export default Home;