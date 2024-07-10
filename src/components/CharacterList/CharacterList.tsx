import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Loader } from '@components/Loader/Loader';
import { useData } from '@contexts/dataProvider';
import styles from './CharacterList.module.scss';

export const CharacterList = () => {
  const { data, isLoading } = useData();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      {data.results.length > 0 ? (
        <ul className={styles.mainContainer}>
          {data.results.map(character => (
            <CharacterItem key={character.name} character={character} />
          ))}
        </ul>
      ) : (
        <div className={styles.emptySearch}>Sorry, we couldn`t find anything matching your search.</div>
      )}
    </main>
  );
};
