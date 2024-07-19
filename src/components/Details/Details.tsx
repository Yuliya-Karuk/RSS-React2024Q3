import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { Loader } from '@components/Loader/Loader';
import { useToast } from '@contexts/toastProvider';
import { useClickOutside } from '@hooks/useClickOutside';
import { useFilms } from '@hooks/useFilms';
import { Film } from '@models/index';
import { extractPlanetPath, isNotNullable, urlImgTemplates } from '@utils/utils';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetCharacterByIdQuery, useGetPlanetQuery } from 'src/store/api/swapiApi';
import { selectFilms } from 'src/store/selectors';
import styles from './Details.module.scss';

export const Details = () => {
  const location = useLocation();
  const [characterId, setCharacterId] = useState<string | null>(null);
  const { errorNotify } = useToast();
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const navigate = useNavigate();
  const detailsRef = useRef(null);

  const [homeworld, setHomeworld] = useState<string | null>(null);
  useFilms();
  const films = useSelector(selectFilms);
  const { data: character, error: characterError } = useGetCharacterByIdQuery(characterId || '', {
    skip: !characterId,
  });
  const { data: planet, error: planetError } = useGetPlanetQuery(homeworld || '', { skip: !homeworld });

  useEffect(() => {
    if (characterError || planetError) {
      errorNotify(`Error fetching data: ${characterError}`);
    }
  }, [characterError, planetError, errorNotify]);

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

  const closeDetails = () => {
    const params = new URLSearchParams(location.search);
    params.delete('details');
    navigate(`/?${params.toString()}`);
  };

  useClickOutside(detailsRef, closeDetails);

  if (!character || !planet || films.length < 0) {
    return (
      <div className={styles.details} data-testid="loader">
        <Loader style={{ alignSelf: 'flex-start' }} />
      </div>
    );
  }

  return (
    character && (
      <div className={styles.details} data-testid="details" ref={detailsRef}>
        <div className={styles.characterImgContainer}>
          <img
            className={styles.characterImg}
            src={urlImgTemplates.character(isNotNullable(characterId))}
            alt="Character"
          />
        </div>
        <p>{character.name}</p>
        <DetailsInfo character={character} />
        {filteredFilms && <DetailsFilms filteredFilms={filteredFilms} />}
        {planet && <DetailsPlanet planet={planet} />}
        <button type="button" className={styles.closeButton} aria-label="Close details" onClick={closeDetails}>
          <span className={styles.closeIcon} />
        </button>
      </div>
    )
  );
};
