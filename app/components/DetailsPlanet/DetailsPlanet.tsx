import { PlanetImg } from '@components/PlanetImg/PlanetImg';
import { Planet } from '@models/index';
import styles from './DetailsPlanet.module.scss';

interface DetailsPlanetProps {
  planet: Planet;
}

export const DetailsPlanet = ({ planet }: DetailsPlanetProps) => (
  <div className={styles.characterFeatureBlock}>
    <h4 className={styles.blockTitle}>Home planet</h4>
    <div className={styles.characterFeatureBlock}>
      <h5 className={styles.featureTitle}>{planet.name}</h5>
      <div className={styles.planetImgContainer}>
        <PlanetImg planet={planet} />
      </div>
    </div>
  </div>
);
