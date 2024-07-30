import { useGetCharacterByIdQuery, useGetFilmsQuery, useGetPlanetQuery } from '@store/api/swapiApi';
import { selectFilms } from '@store/selectors';
import { extractPlanetPath } from '@utils/utils';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export const useDetails = () => {
  const [characterId, setCharacterId] = useState<string | null>(null);

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

  useEffect(() => {
    const setSearchInput = () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('details') || '';

      setCharacterId(id);
    };

    setSearchInput();
  }, []);

  return { character, planet, filteredFilms };
};
