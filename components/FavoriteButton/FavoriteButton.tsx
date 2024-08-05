'use client';

import { useFavorites } from '@hooks/useFavorites';
import { CharacterWithFavorite, CharacterWithId } from '@models/index';
import HeartIcon from '@public/icons/heart.svg';
import { selectFavorites } from '@store/selectors';
import { setFavoriteFlag } from '@utils/utils';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  favorite?: CharacterWithFavorite;
  character?: CharacterWithId;
}
export const FavoriteButton = ({ favorite, character }: FavoriteButtonProps) => {
  const favorites = useSelector(selectFavorites);
  const preparedCharacter = character && setFavoriteFlag([character], favorites)[0];
  const { showHeart, handleToggleFavorite } = useFavorites(favorite || preparedCharacter);

  return (
    <button type="button" className={styles.addToFavoriteButton} onClick={handleToggleFavorite}>
      <HeartIcon
        className={classnames(styles.heart, {
          [styles.favorite]: (favorite && favorite.isFavorite) || (preparedCharacter && preparedCharacter.isFavorite),
        })}
      />
      {showHeart && <HeartIcon className={styles.heartAnimation} />}
    </button>
  );
};
