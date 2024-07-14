import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { useData } from '@contexts/dataProvider';
import styles from './CharacterList.module.scss';

export const CharacterList = () => {
  const { data } = useData();

  return (
    <div className={styles.main}>
      {data && data.results.length > 0 ? (
        <ul className={styles.mainContainer}>
          {data.results.map(character => (
            <CharacterItem key={character.name} character={character} />
          ))}
        </ul>
      ) : (
        <div className={styles.emptySearch}>Sorry, we couldn`t find anything matching your search.</div>
      )}
    </div>
  );
};
