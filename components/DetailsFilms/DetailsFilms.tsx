'use client';

import { useFilms } from '@contexts/filmsProvaider';
import { CharacterWithId } from '@models/index';
import { urlImgTemplates } from '@utils/utils';
import Image from 'next/image';
import styles from './DetailsFilms.module.scss';

interface DetailsFilmsProps {
  character: CharacterWithId;
}

export const DetailsFilms = ({ character }: DetailsFilmsProps) => {
  const { films } = useFilms();
  const filteredFilms = films.filter(film => character.films.includes(film.url));

  return (
    <div>
      <h4 className={styles.blockTitle}>Films</h4>
      <ul className={styles.films}>
        {filteredFilms.map(film => (
          <li key={film.episode_id} className={styles.filmItem}>
            <h5 className={styles.featureTitle}>{film.title}</h5>
            <div className={styles.filmImgContainer}>
              <Image
                priority
                width={400}
                height={550}
                className={styles.filmImg}
                src={urlImgTemplates.film(film.episode_id)}
                alt="Film"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
