import { CloseDetailsButtons } from '@components/CloseDetailsButton/CloseDetailsButton';
import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { FavoriteButton } from '@components/FavoriteButton/FavoriteButton';
import { CharacterWithFavorite, Film, Planet } from '@models/index';
import { isNotNullable, urlImgTemplates } from '@utils/utils';
import Image from 'next/image';
import styles from './DetailsContent.module.scss';

interface DetailsContentProps {
  preparedCharacter: CharacterWithFavorite;
  filteredFilms: Film[];
  planet: Planet;
}

export const DetailsContent = ({ preparedCharacter, filteredFilms, planet }: DetailsContentProps) => {
  const characterImgSrc = preparedCharacter && urlImgTemplates.character(isNotNullable(preparedCharacter.id));

  return (
    <div className={styles.details} data-testid="details">
      <div className={styles.characterImgContainer}>
        <Image
          priority
          width={400}
          height={550}
          className={styles.characterImg}
          src={characterImgSrc}
          alt="Character"
        />
      </div>
      <p>{preparedCharacter.name}</p>
      <DetailsInfo character={preparedCharacter} />
      {filteredFilms && <DetailsFilms filteredFilms={filteredFilms} />}
      {planet && <DetailsPlanet planet={planet} />}
      <CloseDetailsButtons />
      <FavoriteButton favorite={preparedCharacter} />
    </div>
  );
};
