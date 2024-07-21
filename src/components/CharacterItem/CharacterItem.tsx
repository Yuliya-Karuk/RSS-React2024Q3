/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useHandleDetails } from '@hooks/useHandleDetails';
import { CharacterWithId } from '@models/index';
import { urlImgTemplates } from '@utils/utils';
import classnames from 'classnames';
import styles from './CharacterItem.module.scss';

interface CharacterItemProps {
  character: CharacterWithId;
  isDetailsOpen: boolean;
}

export const CharacterItem = ({ character, isDetailsOpen }: CharacterItemProps) => {
  const { openDetails } = useHandleDetails();
  const imageUrl = urlImgTemplates.character(character.id);

  return (
    <li
      className={classnames(styles.characterItem, { [styles.small]: isDetailsOpen })}
      role="button"
      tabIndex={0}
      onClick={e => openDetails(e, character.id)}
      onKeyUp={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          openDetails(e, character.id);
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
