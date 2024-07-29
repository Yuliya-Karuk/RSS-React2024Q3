import { CharacterWithFavorite } from '@models/index';
import { toggleFavorite } from '@store/favoritesSlice';
import { useFavoriteButton } from './useFavoriteButton';
import { useAppDispatch } from './useStoreHooks';

export const useFavorites = (character: CharacterWithFavorite | undefined) => {
  const dispatch = useAppDispatch();
  const { showHeart, handleFavoriteClick } = useFavoriteButton();

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (character) {
      e.stopPropagation();
      handleFavoriteClick();
      dispatch(toggleFavorite(character));
    }
  };

  return { showHeart, handleToggleFavorite };
};
