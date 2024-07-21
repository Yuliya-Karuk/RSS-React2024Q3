import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { Loader } from '@components/Loader/Loader';
import { useDetails } from '@hooks/useDetails';
import { useHandleDetails } from '@hooks/useHandleDetails';
import { isNotNullable, urlImgTemplates } from '@utils/utils';
import styles from './Details.module.scss';

export const Details = () => {
  const { character, planet, filteredFilms } = useDetails();

  const { closeDetails } = useHandleDetails();

  if (!character || !planet || filteredFilms.length < 0) {
    return (
      <div className={styles.details} data-testid="loader">
        <Loader style={{ alignSelf: 'flex-start' }} />
      </div>
    );
  }

  return (
    character && (
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
        <button type="button" className={styles.closeButton} aria-label="Close details" onClick={closeDetails}>
          <span className={styles.closeIcon} />
        </button>
      </div>
    )
  );
};
