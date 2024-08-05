import { CharacterList } from '@components/CharacterList/CharacterList';
import { Details } from '@components/Details/Details';
import { Favorites } from '@components/Favorites/Favorites';
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

  const data = await getPeople(query, page);

  const totalPages = data ? Math.ceil(data.count / productPerPage) : 0;

  return (
    <ThemeContainer>
      <div className={styles.container}>
        {data && (
          <div className={styles.leftContainer}>
            <CharacterList characters={data.results} isDetailsOpen={Boolean(details)} />
            {page && <Pagination currentPage={Number(page)} totalPages={totalPages} />}
          </div>
        )}
        {Boolean(details) && <Details id={details} />}
      </div>
      <Favorites />
    </ThemeContainer>
  );
};

export default Home;
