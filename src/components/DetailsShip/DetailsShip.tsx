import { Starship } from '@models/index';
import styles from './DetailsShip.module.scss';

interface DetailsShipProps {
  filteredStarships: Starship[];
}

export const DetailsShip = ({ filteredStarships }: DetailsShipProps) => (
  <div className={styles.starships}>
    <h4 className={styles.blockTitle}>Starships</h4>
    {filteredStarships.length > 0 ? (
      <ul className={styles.starshipsList}>
        {filteredStarships.map(ship => (
          <li key={ship.name} className={styles.starshipItem}>
            <div className={styles.starshipImgContainer}>
              <span className={styles.starshipImg} />
            </div>
            <h5 className={styles.featureTitle}>{ship.name}</h5>
          </li>
        ))}
      </ul>
    ) : (
      <div className={styles.empty}>Not found</div>
    )}
  </div>
);
