import { Planet } from '@models/index';
import { getPlanetImgSrc } from '@utils/utils';
import styles from './PlanetImg.module.scss';

interface PlanetImgProps {
  planet: Planet;
}

export const PlanetImg = ({ planet }: PlanetImgProps) => (
  <div className={styles.planetImgContainer}>
    <img className={styles.planetImg} src={getPlanetImgSrc(planet.url)} alt="Character" />
  </div>
);
