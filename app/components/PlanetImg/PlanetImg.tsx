import defaultImg from '@assets/images/default-planet.jpg';
import { Planet } from '@models/index';
import { extractIdFromUrl, urlImgTemplates } from '@utils/utils';
import styles from './PlanetImg.module.scss';

interface PlanetImgProps {
  planet: Planet;
}

const PlanetWithoutImg = [
  1, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
  50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
];

function getPlanetImgSrc(planetUrl: string): string {
  const planetId = extractIdFromUrl(planetUrl);

  if (PlanetWithoutImg.includes(Number(planetId))) {
    return defaultImg;
  }

  return urlImgTemplates.planet(planetId);
}

export const PlanetImg = ({ planet }: PlanetImgProps) => (
  <div className={styles.planetImgContainer}>
    <img className={styles.planetImg} src={getPlanetImgSrc(planet.url)} alt="Character" />
  </div>
);
