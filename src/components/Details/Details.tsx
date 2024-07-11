import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { DetailsShip } from '@components/DetailsShip/DetailsShip';
import { Loader } from '@components/Loader/Loader';
import { useData } from '@contexts/dataProvider';
import { useToast } from '@contexts/toastProvider';
import { Character, Film, Planet, Starship } from '@models/index';
import { api } from '@services/api';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Details.module.scss';

export const Details = () => {
  const location = useLocation();
  const [characterId, setCharacterId] = useState<number | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { errorNotify } = useToast();
  const { films, starships } = useData();
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
  const [filteredStarships, setFilteredStarships] = useState<Starship[]>([]);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (characterId && films && starships) {
        try {
          const response = await api.getCharacterById(characterId);
          setCharacter(response);
          setFilteredFilms(films.results.filter(film => response.films.includes(film.url)));
          setFilteredStarships(starships.filter(ship => response.starships.includes(ship.url)));
        } catch (e) {
          errorNotify((e as Error).message);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [characterId, errorNotify, films, starships]);

  useEffect(() => {
    const setSearchInput = () => {
      const params = new URLSearchParams(location.search);
      const id = params.get('details') || '';

      setCharacterId(+id);
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

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  return (
    character && (
      <div className={styles.details}>
        <div className={styles.characterImgContainer}>
          <img
            className={styles.characterImg}
            src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
            alt="Character"
          />
        </div>
        <p>{character.name}</p>
        <DetailsInfo character={character} />
        {filteredFilms && <DetailsFilms filteredFilms={filteredFilms} />}
        {planet && <DetailsPlanet planet={planet} />}
        {filteredStarships && <DetailsShip filteredStarships={filteredStarships} />}
        <button type="button" className={styles.closeButton} aria-label="Close details" onClick={closeDetails}>
          <span className={styles.closeIcon} />
        </button>
      </div>
    )
  );
};
