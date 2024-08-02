import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { FavoriteButton } from '@components/FavoriteButton/FavoriteButton';
import { useDetails } from '@hooks/useDetails';
import { useHandleDetails } from '@hooks/useHandleDetails';
import { selectFavorites } from '@store/selectors';
import { isNotNullable, setFavoriteFlag, urlImgTemplates } from '@utils/utils';
import { useSelector } from 'react-redux';
import styles from './Details.module.scss';

export const Details = () => {
  const { character, planet, filteredFilms } = useDetails();
  const favorites = useSelector(selectFavorites);
  const preparedCharacter = character && setFavoriteFlag([character], favorites)[0];
  const { closeDetails } = useHandleDetails();

  // console.log(preparedCharacter);

  return (
    preparedCharacter && (
      <div className={styles.details} data-testid="details">
        <div className={styles.characterImgContainer}>
          <img
            className={styles.characterImg}
            src={urlImgTemplates.character(isNotNullable(preparedCharacter.id))}
            alt="Character"
          />
        </div>
        <p>{preparedCharacter.name}</p>
        <DetailsInfo character={preparedCharacter} />
        {filteredFilms && <DetailsFilms filteredFilms={filteredFilms} />}
        {planet && <DetailsPlanet planet={planet} />}
        <button type="button" className={styles.closeButton} aria-label="Close details" onClick={() => closeDetails()}>
          <span className={styles.closeIcon} />
        </button>
        <FavoriteButton favorite={preparedCharacter} />
      </div>
    )
  );
};
