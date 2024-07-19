import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { Loader } from '@components/Loader/Loader';
import { useData } from '@contexts/dataProvider';
import { useToast } from '@contexts/toastProvider';
import { useClickOutside } from '@hooks/useClickOutside';
import { Character, Film, Planet } from '@models/index';
import { api } from '@services/api';
import { isNotNullable, urlImgTemplates } from '@utils/utils';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Details.module.scss';

export const Details = () => {
  const location = useLocation();
  const [characterId, setCharacterId] = useState<string | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { errorNotify } = useToast();
  const { films } = useData();
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const navigate = useNavigate();
  const detailsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!characterId || !films) {
        return;
      }

      try {
        setIsLoading(true);
        const response = await api.getCharacterById(+characterId);
        setCharacter(response);
        setFilteredFilms(films.results.filter(film => response.films.includes(film.url)));
      } catch (e) {
        errorNotify((e as Error).message);
      }

      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId, films]);

  useEffect(() => {
    const setSearchInput = () => {
      const params = new URLSearchParams(location.search);
      const id = params.get('details') || '';

      setCharacterId(id);
    };

    setSearchInput();
  }, [location.search]);

  useEffect(() => {
    const getPlanet = async () => {
      if (character) {
        const planetResponse = await api.getPlanet(character.homeworld);
        setPlanet(planetResponse);
      }
    };

    getPlanet();
  }, [character]);

  const closeDetails = () => {
    const params = new URLSearchParams(location.search);
    params.delete('details');
    navigate(`/?${params.toString()}`);
  };

  useClickOutside(detailsRef, closeDetails);

  if (isLoading) {
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
