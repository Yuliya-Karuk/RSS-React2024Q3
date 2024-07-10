/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { Character } from '@models/index';
import { extractIdFromUrl } from '@utils/utils';
import classnames from 'classnames';
import styles from './CharacterItem.module.scss';

interface CharacterItemProps {
  character: Character;
  setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CharacterItem = ({ character, setDetailsOpen }: CharacterItemProps) => {
  const characterId = extractIdFromUrl(character.url);
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;

  const handleItemClick = () => {
    setDetailsOpen(true);
  };

  return (
    <li className={styles.characterItem} role="button" tabIndex={0} onClick={handleItemClick}>
      <div className={styles.characterImgContainer}>
        <img className={styles.characterImg} src={imageUrl} alt="Character" />
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
    </li>
  );
};
