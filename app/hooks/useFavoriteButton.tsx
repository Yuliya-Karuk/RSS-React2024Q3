import { useState } from 'react';

export const useFavoriteButton = () => {
  const [showHeart, setShowHeart] = useState(false);

  const handleFavoriteClick = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 400);
  };

  return { showHeart, handleFavoriteClick };
};
