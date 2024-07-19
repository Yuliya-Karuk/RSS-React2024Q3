import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Character } from '@models/index';
import classnames from 'classnames';
import styles from './CharacterList.module.scss';

interface CharacterListProps {
  characters: Character[];
  isDetailsOpen: boolean;
}

export const CharacterList = ({ characters, isDetailsOpen }: CharacterListProps) => (
  <ul className={classnames(styles.mainContainer, { [styles.small]: isDetailsOpen })}>
    {characters.map(character => (
      <CharacterItem key={character.name} character={character} isDetailsOpen={isDetailsOpen} />
    ))}
  </ul>
);
