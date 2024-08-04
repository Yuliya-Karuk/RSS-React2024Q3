import { useFavorites } from '@hooks/useFavorites';
import { CharacterWithFavorite } from '@models/index';
import HeartIcon from '@public/icons/heart.svg';
import classnames from 'classnames';
import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  favorite: CharacterWithFavorite;
}
export const FavoriteButton = ({ favorite }: FavoriteButtonProps) => {
  const { showHeart, handleToggleFavorite } = useFavorites(favorite);

  return (
    <button type="button" className={styles.addToFavoriteButton} onClick={handleToggleFavorite}>
      <HeartIcon className={classnames(styles.heart, { [styles.favorite]: favorite.isFavorite })} />
      {showHeart && <HeartIcon className={styles.heartAnimation} />}
    </button>
  );
};
