import { FavoriteButton } from '@components/FavoriteButton/FavoriteButton';
import { CharacterWithFavorite } from '@models/index';
import { urlImgTemplates } from '@utils/utils';
import Image from 'next/image';
import styles from './FavoritesItem.module.scss';

interface FavoritesListProps {
  favorite: CharacterWithFavorite;
}

export const FavoritesItem = ({ favorite }: FavoritesListProps) => {
  const imageUrl = urlImgTemplates.character(favorite.id);

  return (
    <li className={styles.favoritesItem}>
      <h4 className={styles.favoritesName}>{favorite.name}</h4>
      <div className={styles.favoritesImgContainer}>
        <Image className={styles.favoritesImg} src={imageUrl} alt="Favorite item" width={400} height={550} />
      </div>
      <FavoriteButton favorite={favorite} />
    </li>
  );
};
