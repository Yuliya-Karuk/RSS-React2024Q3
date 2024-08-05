import { CharacterList } from '@components/CharacterList/CharacterList';
import { Pagination } from '@components/Pagination/Pagination';
import ThemeContainer from '@components/ThemeContainer/ThemeContainer';
import { PaginatedCharacters, PaginatedCharactersWithId } from '@models/index';
import styles from '@styles/home.module.scss';
import { addIdToCharacters } from '@utils/utils';

async function getPeople(searchValue: string = '', page: string = '1'): Promise<PaginatedCharactersWithId> {
  const response = await fetch(`https://swapi.dev/api/people/?search=${searchValue}&page=${page}`, {
    method: 'GET',
  });

  const people: PaginatedCharacters = await response.json();
  const charactersWithId = addIdToCharacters(people);
  return charactersWithId;
}

const productPerPage: number = 10;

const Home = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const { details, page, query } = searchParams;
  console.log(details, page, query);

  const data = await getPeople(query, page);
  console.log(data);
  // const { searchDetails, currentPage, searchQuery } = useSearchParams();
  // console.log(searchDetails, 'details', currentPage, 'page', searchQuery, 'query');
  // const { theme } = useTheme();

  // const { data } = useSearchPeopleQuery({
  //   searchValue: searchQuery,
  //   page: currentPage,
  // });

  const totalPages = data ? Math.ceil(data.count / productPerPage) : 0;

  // const favorites = useSelector(selectFavorites);

  return (
    <ThemeContainer>
      <div className={styles.container}>
        {data && (
          <div className={styles.leftContainer}>
            <CharacterList characters={data.results} isDetailsOpen={Boolean(details)} />
            {page && <Pagination currentPage={Number(page)} totalPages={totalPages} />}
          </div>
        )}
        {/* {Boolean(searchDetails) && <Details />} */}
      </div>
    </ThemeContainer>
    // <main className={classnames(styles.page, { [styles.light]: theme === 'light' })}>
    //   <div className={styles.container}>
    //     {data && (
    //       <div className={styles.leftContainer}>
    //         <CharacterList characters={data.results} isDetailsOpen={Boolean(searchDetails)} />
    //         {currentPage && <Pagination currentPage={currentPage} totalPages={totalPages} />}
    //       </div>
    //     )}
    //     {Boolean(searchDetails) && <Details />}
    //   </div>
    //   {favorites.length > 0 && <Favorites favorites={favorites} />}
    // </main>
  );
};

export default Home;
