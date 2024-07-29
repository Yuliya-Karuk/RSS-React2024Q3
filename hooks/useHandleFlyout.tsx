import { CharacterWithFavorite } from '@models/index';
import { clearFavorites } from '@store/favoritesSlice';
import { generateCSVContent } from '@utils/utils';
import { useAppDispatch } from './useStoreHooks';

export const useHandleFlyout = (favorites: CharacterWithFavorite[]) => {
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

  return { downloadUrl, handleRemoveAll };
};
