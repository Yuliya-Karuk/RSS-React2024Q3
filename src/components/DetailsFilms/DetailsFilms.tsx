import { Film } from '@models/index';
import styles from './DetailsFilms.module.scss';

interface DetailsFilmsProps {
  filteredFilms: Film[];
}

export const DetailsFilms = ({ filteredFilms }: DetailsFilmsProps) => (
  <div>
    <h4 className={styles.blockTitle}>Films</h4>
    <ul className={styles.films}>
      {filteredFilms.map(film => (
        <li key={film.episode_id} className={styles.filmItem}>
          <h5 className={styles.featureTitle}>{film.title}</h5>
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
);
