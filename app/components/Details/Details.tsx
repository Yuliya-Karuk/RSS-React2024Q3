import { CloseDetailsButton } from '@components/CloseDetailsButton/CloseDetailsButton';
import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { FavoriteButton } from '@components/FavoriteButton/FavoriteButton';
import { useAppSelector } from '@hooks/useStoreHooks';
import { CharacterWithId, Film, Planet } from '@models/index';
import { selectFavorites } from '@store/selectors';
import { isNotNullable, setFavoriteFlag, urlImgTemplates } from '@utils/utils';
import styles from './Details.module.scss';

interface DetailsProps {
  detailsCharacter: CharacterWithId;
  planet: Planet;
  films: Film[];
}

export default function Details({ films, planet, detailsCharacter }: DetailsProps) {
  const favorites = useAppSelector(selectFavorites);
  const characterWithFavorites = detailsCharacter && setFavoriteFlag([detailsCharacter], favorites)[0];
  const filteredFilms = films.filter(film => characterWithFavorites.films.includes(film.url));

  return (
    characterWithFavorites && (
      <div className={styles.details} data-testid="details">
        <div className={styles.characterImgContainer}>
          <img
            className={styles.characterImg}
            src={urlImgTemplates.character(isNotNullable(characterWithFavorites.id))}
            alt="Character"
          />
        </div>
        <p>{detailsCharacter.name}</p>
        <DetailsInfo character={characterWithFavorites} />
        <DetailsFilms filteredFilms={filteredFilms} />
        {planet && <DetailsPlanet planet={planet} />}
        <CloseDetailsButton />
        <FavoriteButton favorite={characterWithFavorites} />
      </div>
    )
  );
}
