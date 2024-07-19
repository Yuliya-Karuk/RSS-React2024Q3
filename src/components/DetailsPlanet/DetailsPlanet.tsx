import defaultPlanet from '@assets/default-planet.jpg';
import { Planet } from '@models/index';
import { extractIdFromUrl, urlImgTemplates } from '@utils/utils';
import styles from './DetailsPlanet.module.scss';

interface DetailsPlanetProps {
  planet: Planet;
}

export const DetailsPlanet = ({ planet }: DetailsPlanetProps) => {
  const handleImgSrcError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultPlanet;
  };

  return (
    <div className={styles.characterFeatureBlock}>
      <h4 className={styles.blockTitle}>Home planet</h4>
      <div className={styles.characterFeatureBlock}>
        <h5 className={styles.featureTitle}>{planet.name}</h5>
        <div className={styles.planetImgContainer}>
          <img
            className={styles.planetImg}
            src={urlImgTemplates.planet(extractIdFromUrl(planet.url))}
            alt="Character"
            onError={e => handleImgSrcError(e)}
          />
        </div>
      </div>
    </div>
  );
};
