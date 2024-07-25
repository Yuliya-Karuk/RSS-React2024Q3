import { selectFavorites } from '@store/selectors';
import { isNotNullable, urlImgTemplates } from '@utils/utils';
import { useSelector } from 'react-redux';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const favorites = useSelector(selectFavorites);

  return (
    favorites.length > 0 && (
      <div className={styles.favorites}>
        <div className={styles.container}>
          <h3 className={styles.favoritesTitle}>Favorites</h3>
          <ul className={styles.favoritesList}>
            {favorites.map(fav => (
              <li key={fav.name} className={styles.favoritesItem}>
                <h4 className={styles.favoritesName}>{fav.name}</h4>
                <div className={styles.favoritesImgContainer}>
                  <img
                    className={styles.favoritesImg}
                    src={urlImgTemplates.character(isNotNullable(fav.id))}
                    alt="Character"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};
