/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { useHandleDetails } from '@hooks/useHandleDetails';
import { CharacterWithFavorite, CharacterWithId } from '@models/index';
import { selectFavorites } from '@store/selectors';
import { setFavoriteFlag } from '@utils/utils';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './CharacterList.module.scss';

interface CharacterListProps {
  characters: CharacterWithId[];
  isDetailsOpen: boolean;
}

export const CharacterList = ({ characters, isDetailsOpen }: CharacterListProps) => {
  const { closeDetails } = useHandleDetails();

  const favorites = useSelector(selectFavorites);
  const markedCharacters: CharacterWithFavorite[] = setFavoriteFlag(characters, favorites);

  return characters.length > 0 ? (
    <ul className={classnames(styles.mainContainer, { [styles.small]: isDetailsOpen })} onClick={closeDetails}>
      {markedCharacters.map(character => (
        <CharacterItem key={character.id} character={character} isDetailsOpen={isDetailsOpen} />
      ))}
    </ul>
  ) : (
    <div className={styles.emptySearch}>Sorry, we couldn't find anything matching your search.</div>
  );
};
