'use client';

import { Planet } from '@models/index';
import { extractIdFromUrl, urlImgTemplates } from '@utils/utils';
import styles from './PlanetImg.module.scss';

interface PlanetImgProps {
  planet: Planet;
}

export const PlanetImg = ({ planet }: PlanetImgProps) => {
  const handleImgSrcError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/images/default-planet.jpg';
  };

  return (
    <div className={styles.planetImgContainer}>
      <img
        className={styles.planetImg}
        src={urlImgTemplates.planet(extractIdFromUrl(planet.url))}
        alt="Character"
        onError={e => handleImgSrcError(e)}
      />
    </div>
  );
};
