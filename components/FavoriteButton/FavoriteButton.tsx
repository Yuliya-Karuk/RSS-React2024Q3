import { useFavorites } from '@hooks/useFavorites';
import { CharacterWithFavorite } from '@models/index';
import heartIcon from '@public/icons/heart.svg';
import classnames from 'classnames';
import styles from './FavoriteButton.module.scss';

// В компоненте:
<img src={heartIcon} alt="Heart Icon" />;

interface FavoriteButtonProps {
  favorite: CharacterWithFavorite;
}

export const FavoriteButton = ({ favorite }: FavoriteButtonProps) => {
  const { showHeart, handleToggleFavorite } = useFavorites(favorite);

  return (
    <button type="button" className={styles.addToFavoriteButton} onClick={handleToggleFavorite}>
      <img
        src={heartIcon}
        alt="Heart Icon"
        className={classnames(styles.heart, { [styles.favorite]: favorite.isFavorite })}
      />
      {showHeart && <img src={heartIcon} alt="Heart Icon" className={styles.heartAnimation} />}
    </button>
  );
};
