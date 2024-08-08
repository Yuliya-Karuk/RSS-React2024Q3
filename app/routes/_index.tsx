import { CharacterList } from '@components/CharacterList/CharacterList';
import Details from '@components/Details/Details';
import { Favorites } from '@components/Favorites/Favorites';
import { Loader } from '@components/Loader/Loader';
import { Pagination } from '@components/Pagination/Pagination';
import ThemeContainer from '@components/ThemeContainer/ThemeContainer';
import {
  Character,
  CharacterWithId,
  Film,
  PaginatedCharacters,
  PaginatedCharactersWithId,
  Planet,
} from '@models/index';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import styles from '@styles/home.module.scss';
import { addIdToCharacter, addIdToCharacters } from '@utils/utils';
import { Suspense } from 'react';

// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

interface IndexData {
  paginatedCharacters: PaginatedCharactersWithId;
  detailsCharacter?: CharacterWithId;
  planet?: Planet;
  films?: Film[] | undefined;
  details: string;
  page: string;
}

export const loader = async ({ request }: LoaderFunctionArgs): Promise<IndexData> => {
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

  if (details) {
    const detailsResponse = await fetch(`https://swapi.dev/api/people/${details}`, {
      method: 'GET',
    });
    const character: Character = await detailsResponse.json();
    const characterWithId: CharacterWithId = addIdToCharacter(character);

    const planetResponse = await fetch(character.homeworld, {
      method: 'GET',
    });

    const planet: Planet = await planetResponse.json();

    const filmsResponse = await fetch('https://swapi.dev/api/films/', {
      method: 'GET',
    });

    const films = await filmsResponse.json();

    return {
      paginatedCharacters: charactersWithId,
      details,
      page,
      films: films.results,
      planet,
      detailsCharacter: characterWithId,
    };
  }

  return { paginatedCharacters: charactersWithId, details, page };
};

const productPerPage: number = 10;

export default function Index() {
  const { paginatedCharacters, details, page, films, planet, detailsCharacter }: IndexData = useLoaderData();

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

        {Boolean(details) && (
          <Suspense fallback={<Loader />}>
            <Await resolve={{ films, planet, detailsCharacter }}>
              {() => {
                if (films && planet && detailsCharacter) {
                  return <Details films={films} planet={planet} detailsCharacter={detailsCharacter} />;
                }
                return <Loader />;
              }}
            </Await>
          </Suspense>
        )}
      </div>
      <Favorites />
    </ThemeContainer>
  );
}
