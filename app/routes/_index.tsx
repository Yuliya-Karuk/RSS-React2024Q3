import { CharacterList } from '@components/CharacterList/CharacterList';
import { Pagination } from '@components/Pagination/Pagination';
import ThemeContainer from '@components/ThemeContainer/ThemeContainer';
import { PaginatedCharacters, PaginatedCharactersWithId } from '@models/index';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import styles from '@styles/home.module.scss';
import { addIdToCharacters } from '@utils/utils';

// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

interface IndexLoaderReturn {
  paginatedCharacters: PaginatedCharactersWithId;
  details: string;
  page: string;
}

export const loader = async ({ request }: LoaderFunctionArgs): Promise<IndexLoaderReturn> => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const search = searchParams.get('query') || '';
  const page = searchParams.get('page') || '';
  const details = searchParams.get('details') || '';

  const response = await fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`, {
    method: 'GET',
  });

  const people: PaginatedCharacters = await response.json();
  const charactersWithId = addIdToCharacters(people);
  return { paginatedCharacters: charactersWithId, details, page: page };
};

const productPerPage: number = 10;

export default function Index() {
  const { paginatedCharacters, details, page }: IndexLoaderReturn = useLoaderData();
  console.log(paginatedCharacters);

  const totalPages = paginatedCharacters ? Math.ceil(paginatedCharacters.count / productPerPage) : 0;

  return (
    <ThemeContainer>
      <div className={styles.container}>
        {paginatedCharacters && (
          <div className={styles.leftContainer}>
            <CharacterList characters={paginatedCharacters.results} isDetailsOpen={Boolean(details)} />
            {page && <Pagination currentPage={Number(page)} totalPages={totalPages} />}
          </div>
        )}
        {/* {Boolean(details) && <DetailsWithLoader id={details} />} */}
      </div>
      {/* <Favorites /> */}
    </ThemeContainer>
  );
};