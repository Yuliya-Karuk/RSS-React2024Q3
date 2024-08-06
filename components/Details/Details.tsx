import { CloseDetailsButtons } from '@components/CloseDetailsButton/CloseDetailsButton';
import { DetailsFilms } from '@components/DetailsFilms/DetailsFilms';
import { DetailsInfo } from '@components/DetailsInfo/DetailsInfo';
import { DetailsPlanet } from '@components/DetailsPlanet/DetailsPlanet';
import { FavoriteButton } from '@components/FavoriteButton/FavoriteButton';
import { Character, CharacterWithId, Film, Planet } from '@models/index';
import { addIdToCharacter, isNotNullable, urlImgTemplates } from '@utils/utils';
import Image from 'next/image';
import styles from './Details.module.scss';

interface DetailsData {
  charactersWithId: CharacterWithId;
  planet: Planet;
  films: Film[];
}

async function getDetailsData(id: string): Promise<DetailsData> {
  const detailsResponse = await fetch(`https://swapi.dev/api/people/${id}`, {
    method: 'GET',
  });
  const character: Character = await detailsResponse.json();
  const charactersWithId: CharacterWithId = addIdToCharacter(character);

  const planetResponse = await fetch(character.homeworld, {
    method: 'GET',
  });

  const planet: Planet = await planetResponse.json();

  const filmsResponse = await fetch('https://swapi.dev/api/films/', {
    method: 'GET',
  });

  const films = await filmsResponse.json();

  return { charactersWithId, planet, films: films.results };
}

interface DetailsProp {
  id: string;
}

export const Details = async ({ id }: DetailsProp) => {
  const { charactersWithId, planet, films } = await getDetailsData(id);
  return (
    charactersWithId && (
      <div className={styles.details} data-testid="details">
        <div className={styles.characterImgContainer}>
          <Image
            priority
            width={400}
            height={550}
            className={styles.characterImg}
            src={urlImgTemplates.character(isNotNullable(charactersWithId.id))}
            alt="Character"
          />
        </div>
        <p>{charactersWithId.name}</p>
        <DetailsInfo character={charactersWithId} />
        <DetailsFilms character={charactersWithId} films={films} />
        {planet && <DetailsPlanet planet={planet} />}
        <CloseDetailsButtons />
        <FavoriteButton character={charactersWithId} />
      </div>
    )
  );
};
