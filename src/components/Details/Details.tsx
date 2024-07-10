import { Loader } from '@components/Loader/Loader';
import { useData } from '@contexts/dataProvider';
import { useToast } from '@contexts/toastProvider';
import { Character, Film } from '@models/index';
import { api } from '@services/api';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Details.module.scss';

export const Details = () => {
  const location = useLocation();
  const [characterId, setCharacterId] = useState<number | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { errorNotify } = useToast();
  const { films } = useData();
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (characterId && films) {
        try {
          const response = await api.getCharacterById(characterId);
          setCharacter(response);
          setFilteredFilms(films.results.filter(film => response.films.includes(film.url)));
          // console.log(response);
        } catch (e) {
          errorNotify((e as Error).message);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [characterId, errorNotify, films]);

  useEffect(() => {
    const setSearchInput = () => {
      const params = new URLSearchParams(location.search);
      const id = params.get('details') || '';

      setCharacterId(+id);
    };

    setSearchInput();
  }, [location.search]);

  // console.log(filteredFilms);

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
        <div className={styles.characterFeatureBlock}>
          <p className={styles.featureTitle}>Gender</p>
          <div className={styles.genderIcon}>
            <span className={classnames(styles.male, { [styles.female]: character.gender === 'female' })} />
          </div>
        </div>
        <div className={styles.characterFeatureBlock}>
          <p className={styles.featureTitle}>Date of Birth</p>
          <p className={styles.featureValue}>{character.birth_year}</p>
        </div>
        <div className={styles.characterFeatureBlock}>
          <p className={styles.featureTitle}>Weight</p>
          <p className={styles.featureValue}>{character.mass}</p>
        </div>
        <div className={styles.characterFeatureBlock}>
          <p className={styles.featureTitle}>Height</p>
          <p className={styles.featureValue}>{character.height}</p>
        </div>
        <div>
          <h4>Films</h4>
          <ul className={styles.films}>
            {filteredFilms.map(film => (
              <li key={film.episode_id} className={styles.filmItem}>
                <h5>{film.title}</h5>
                <div className={styles.filmImgContainer}>
                  <img
                    className={styles.filmImg}
                    src={`https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`}
                    alt="Character"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};
