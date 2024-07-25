import { FavoritesItem } from '@components/FavoritesList/FavoritesItem';
import { useHandleFlyout } from '@hooks/useHandleFlyout';
import { selectFavorites } from '@store/selectors';
import { useSelector } from 'react-redux';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const favorites = useSelector(selectFavorites);
  const { downloadUrl, handleRemoveAll } = useHandleFlyout(favorites);

  return (
    favorites.length > 0 && (
      <div className={styles.favorites}>
        <div className={styles.container}>
          <h3 className={styles.favoritesTitle}>
            Favorites <span className={styles.favoritesName}>({favorites.length} selected)</span>
          </h3>
          <div className={styles.favoritesBlock}>
            <button type="button" className={styles.favoritesButton} onClick={handleRemoveAll} aria-label="remove all">
              <span className={styles.removeIcon} />
            </button>
            <a
              href={downloadUrl}
              download={`${favorites.length}_characters.csv`}
              className={styles.favoritesButton}
              aria-label="download"
            >
              <span className={styles.downloadIcon} />
            </a>
          </div>
          <ul className={styles.favoritesList}>
            {favorites.map(fav => (
              <FavoritesItem key={fav.name} favorite={fav} />
            ))}
          </ul>
        </div>
      </div>
    )
  );
};
