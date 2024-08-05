'use client';

import { useGetCharacterByIdQuery, useGetFilmsQuery, useGetPlanetQuery } from '@store/api/swapiApi';
import { extractPlanetPath } from '@utils/utils';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const useDetails = () => {
  const searchParams = useSearchParams();
  const characterId = searchParams && searchParams.get('details');

  const { data: character } = useGetCharacterByIdQuery(characterId || '', {
    skip: !characterId,
  });

  const planetPath = useMemo(() => (character ? extractPlanetPath(character.homeworld) : ''), [character]);
  const { data: planet } = useGetPlanetQuery(planetPath, { skip: !character });

  const { data: films } = useGetFilmsQuery();

  const { filteredFilms } = useMemo(() => {
    if (character && films) {
      const preparedFilms = films.results.filter(film => character.films.includes(film.url));
      return { filteredFilms: preparedFilms };
    }
    return { filteredFilms: [] };
  }, [character, films]);

  return { character, planet, filteredFilms };
};
