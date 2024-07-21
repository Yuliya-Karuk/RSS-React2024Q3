import { Film } from '@models/index';
import { extractPlanetPath } from '@utils/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useGetCharacterByIdQuery, useGetPlanetQuery } from 'src/store/api/swapiApi';
import { selectFilms } from 'src/store/selectors';
import { useFilms } from './useFilms';

export const useDetails = () => {
  const [characterId, setCharacterId] = useState<string | null>(null);
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const [homeworld, setHomeworld] = useState<string | null>(null);

  useFilms();
  const films = useSelector(selectFilms);

  const { data: character, isFetching: isCharacterFetching } = useGetCharacterByIdQuery(characterId || '', {
    skip: !characterId,
  });
  const { data: planet, isFetching: isPlanetFetching } = useGetPlanetQuery(homeworld || '', { skip: !homeworld });

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (character && films.length > 0) {
        setFilteredFilms(films.filter(film => character.films.includes(film.url)));
        setHomeworld(extractPlanetPath(character.homeworld));
      }
    };

    fetchData();
  }, [character, films]);

  useEffect(() => {
    const setSearchInput = () => {
      const params = new URLSearchParams(location.search);
      const id = params.get('details') || '';

      setCharacterId(id);
    };

    setSearchInput();
  }, [location.search]);

  return { character, planet, filteredFilms, isCharacterFetching, isPlanetFetching };
};
