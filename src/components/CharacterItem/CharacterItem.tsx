/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { Character } from '@models/index';
import { extractIdFromUrl, urlImgTemplates } from '@utils/utils';
import classnames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CharacterItem.module.scss';

interface CharacterItemProps {
  character: Character;
  isDetailsOpen: boolean;
}

export const CharacterItem = ({ character, isDetailsOpen }: CharacterItemProps) => {
  const characterId = extractIdFromUrl(character.url);
  const imageUrl = urlImgTemplates.character(characterId);
  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = () => {
    const params = new URLSearchParams(location.search);

    params.set('details', characterId);
    navigate(`/?${params.toString()}`);
  };

  return (
    <li
      className={classnames(styles.characterItem, { [styles.small]: isDetailsOpen })}
      role="button"
      tabIndex={0}
      onClick={handleItemClick}
      onKeyUp={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleItemClick();
        }
      }}
    >
      <div className={styles.characterImgContainer}>
        <img className={styles.characterImg} src={imageUrl} alt="Character" />
      </div>
      <h3>{character.name}</h3>
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
