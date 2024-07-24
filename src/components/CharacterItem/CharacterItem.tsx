/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import HeartIcon from '@assets/heart.svg?react';
import { useHandleDetails } from '@hooks/useHandleDetails';
import { useAppDispatch } from '@hooks/useStoreHooks';
import { CharacterWithFavorite } from '@models/index';
import { toggleFavorite } from '@store/favoritesSlice';
import { urlImgTemplates } from '@utils/utils';
import classnames from 'classnames';
import { useState } from 'react';
import styles from './CharacterItem.module.scss';

interface CharacterItemProps {
  character: CharacterWithFavorite;
  isDetailsOpen: boolean;
}

export const CharacterItem = ({ character, isDetailsOpen }: CharacterItemProps) => {
  const { openDetails } = useHandleDetails();
  const imageUrl = urlImgTemplates.character(character.id);

  const [showHeart, setShowHeart] = useState(false);

  const handleFavoriteClick = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 400);
  };

  const dispatch = useAppDispatch();

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleFavoriteClick();
    dispatch(toggleFavorite(character));
  };

  return (
    <li
      className={classnames(styles.characterItem, { [styles.small]: isDetailsOpen })}
      role="button"
      data-testid="item"
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
      <button type="button" className={styles.addToFavoriteButton} onClick={handleToggleFavorite}>
        <HeartIcon className={classnames(styles.heart, { [styles.favorite]: character.isFavorite })} />
        {showHeart && <HeartIcon className={styles.heartAnimation} />}
      </button>
    </li>
  );
};
