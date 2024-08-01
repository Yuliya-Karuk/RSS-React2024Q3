import { CharacterList } from '@components/CharacterList/CharacterList';
import { Details } from '@components/Details/Details';
import { Favorites } from '@components/Favorites/Favorites';
import { Pagination } from '@components/Pagination/Pagination';
import { useTheme } from '@contexts/themeProvider';
import { useSearchParams } from '@hooks/useSearchParams';
import { useAppDispatch } from '@hooks/useStoreHooks';
import { getRunningQueriesThunk, swapiApi, useSearchPeopleQuery } from '@store/api/swapiApi';
import { setCharacters } from '@store/charactersSlice';
import { selectCharacters, selectFavorites, selectTotalPages } from '@store/selectors';
import { wrapper } from '@store/store';
import styles from '@styles/home.module.scss';
import { checkTypesSearchParams, extractPlanetPath } from '@utils/utils';
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

  // if (isLoading || isFetching) {
  //   return (
  //     <div className={styles.page}>
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <main className={classnames(styles.page, { [styles.light]: theme === 'light' })}>
      <div className={styles.container}>
        {characters && (
          <div className={styles.leftContainer}>
            <CharacterList characters={characters} isDetailsOpen={Boolean(searchDetails)} />
            {currentPage && <Pagination currentPage={currentPage} totalPages={totalPages} />}
          </div>
        )}
        {Boolean(searchDetails) && <Details />}
      </div>
      {favorites.length > 0 && <Favorites favorites={favorites} />}
    </main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const { page, query, details } = context.query;

  const { searchDetails, currentPage, searchQuery } = checkTypesSearchParams({ page, query, details });

  await store.dispatch(
    swapiApi.endpoints.searchPeople.initiate({
      searchValue: searchQuery,
      page: currentPage,
    })
  );

  await store.dispatch(swapiApi.endpoints.getFilms.initiate());

  if (searchDetails) {
    const character = await store.dispatch(swapiApi.endpoints.getCharacterById.initiate(searchDetails));
    if (character.data) {
      const planetId = extractPlanetPath(character.data.homeworld);

      await store.dispatch(swapiApi.endpoints.getPlanet.initiate(planetId));
    }
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {},
  };
});

export default Home;
