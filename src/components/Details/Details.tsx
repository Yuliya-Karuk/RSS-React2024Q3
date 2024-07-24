import HeartIcon from '@assets/heart.svg?react';
import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { Loader } from '@components/Loader/Loader';
import { useDetails } from '@hooks/useDetails';
import { useHandleDetails } from '@hooks/useHandleDetails';
import { useAppDispatch } from '@hooks/useStoreHooks';
import { toggleFavorite } from '@store/favoritesSlice';
import { selectFavorites } from '@store/selectors';
import { isNotNullable, markFavorites, urlImgTemplates } from '@utils/utils';
import classnames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Details.module.scss';

export const Details = () => {
  const { character, planet, filteredFilms } = useDetails();
  const favorites = useSelector(selectFavorites);
  const preparedItem = character && markFavorites([character], favorites)[0];
  const { closeDetails } = useHandleDetails();

  const [showHeart, setShowHeart] = useState(false);

  const handleFavoriteClick = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 400);
  };

  const dispatch = useAppDispatch();

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (preparedItem) {
      e.stopPropagation();
      handleFavoriteClick();
      dispatch(toggleFavorite(preparedItem));
    }
  };

  if (!preparedItem || !planet || filteredFilms.length < 0) {
    return (
      <div className={styles.details} data-testid="loader">
        <Loader style={{ alignSelf: 'flex-start' }} />
      </div>
    );
  }

  return (
    preparedItem && (
      <div className={styles.details} data-testid="details">
        <div className={styles.characterImgContainer}>
          <img
            className={styles.characterImg}
            src={urlImgTemplates.character(isNotNullable(character.id))}
            alt="Character"
          />
        </div>
        <p>{character.name}</p>
        <DetailsInfo character={character} />
        {filteredFilms && <DetailsFilms filteredFilms={filteredFilms} />}
        {planet && <DetailsPlanet planet={planet} />}
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close details"
          onClick={() => {
            closeDetails();
          }}
        >
          <span className={styles.closeIcon} />
        </button>
        <button type="button" className={styles.addToFavoriteButton} onClick={handleToggleFavorite}>
          <HeartIcon className={classnames(styles.heart, { [styles.favorite]: preparedItem.isFavorite })} />
          {showHeart && <HeartIcon className={styles.heartAnimation} />}
        </button>
      </div>
    )
  );
};
