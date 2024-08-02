import { useGetCharacterByIdQuery, useGetFilmsQuery, useGetPlanetQuery } from '@store/api/swapiApi';
import { selectFilms } from '@store/selectors';
import { extractPlanetPath } from '@utils/utils';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useDetails = () => {
  const router = useRouter();
  const characterId = (router.query.details as string) || '';

  const films = useSelector(selectFilms);

  const { data: character } = useGetCharacterByIdQuery(characterId || '', {
    skip: !characterId,
  });

  const planetPath = useMemo(() => (character ? extractPlanetPath(character.homeworld) : ''), [character]);
  const { data: planet } = useGetPlanetQuery(planetPath, { skip: !character });
  useGetFilmsQuery();

  const { filteredFilms } = useMemo(() => {
    if (character && films) {
      const preparedFilms = films.filter(film => character.films.includes(film.url));
      return { filteredFilms: preparedFilms };
    }
    return { filteredFilms: [] };
  }, [character, films]);

  return { character, planet, filteredFilms };
};
