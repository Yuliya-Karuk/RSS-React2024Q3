import { useAppDispatch } from '@hooks/useStoreHooks';
import { clearFavorites } from '@store/favoritesSlice';
import { selectFavorites } from '@store/selectors';
import { generateCSVContent, isNotNullable, urlImgTemplates } from '@utils/utils';
import { useSelector } from 'react-redux';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useAppDispatch();

  const handleRemoveAll = () => {
    dispatch(clearFavorites());
  };

  const handleDownload = () => {
    const csvContent = generateCSVContent(favorites);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    return url;
  };

  const downloadUrl = handleDownload();

  return (
    favorites.length > 0 && (
      <div className={styles.favorites}>
        <div className={styles.container}>
          <div className={styles.favoritesBlock}>
            <h3 className={styles.favoritesTitle}>Favorites ({favorites.length} selected)</h3>
            <button type="button" className={styles.favoritesButton} onClick={handleRemoveAll}>
              Remove All
            </button>
            <a href={downloadUrl} download={`${favorites.length}_characters.csv`} className={styles.favoritesButton}>
              Download
            </a>
          </div>
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
