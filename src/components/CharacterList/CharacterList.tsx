/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Character } from '@models/index';
import classnames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CharacterList.module.scss';

interface CharacterListProps {
  characters: Character[];
  isDetailsOpen: boolean;
}

export const CharacterList = ({ characters, isDetailsOpen }: CharacterListProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const closeDetails = () => {
    const params = new URLSearchParams(location.search);
    params.delete('details');
    navigate(`/?${params.toString()}`);
  };

  return (
    <ul className={classnames(styles.mainContainer, { [styles.small]: isDetailsOpen })} onClick={closeDetails}>
      {characters.map(character => (
        <CharacterItem key={character.name} character={character} isDetailsOpen={isDetailsOpen} />
      ))}
    </ul>
  );
};
