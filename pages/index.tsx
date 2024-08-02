/* eslint-disable react-refresh/only-export-components */
import { CharacterList } from '@components/CharacterList/CharacterList';
import { Details } from '@components/Details/Details';
import { Favorites } from '@components/Favorites/Favorites';
import { Pagination } from '@components/Pagination/Pagination';
import { useTheme } from '@contexts/themeProvider';
import { useSearchParams } from '@hooks/useSearchParams';
import { getRunningQueriesThunk, swapiApi, useSearchPeopleQuery } from '@store/api/swapiApi';
import { selectFavorites } from '@store/selectors';
import { wrapper } from '@store/store';
import styles from '@styles/home.module.scss';
import { checkTypesSearchParams, extractPlanetPath } from '@utils/utils';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

const productPerPage: number = 10;

const Home = () => {
  const { searchDetails, currentPage, searchQuery } = useSearchParams();
  const { theme } = useTheme();

  const { data } = useSearchPeopleQuery({
    searchValue: searchQuery,
    page: currentPage,
  });

  const totalPages = data ? Math.ceil(data.count / productPerPage) : 0;

  const favorites = useSelector(selectFavorites);

  return (
    <main className={classnames(styles.page, { [styles.light]: theme === 'light' })}>
      <div className={styles.container}>
        {data && (
          <div className={styles.leftContainer}>
            <CharacterList characters={data.results} isDetailsOpen={Boolean(searchDetails)} />
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
