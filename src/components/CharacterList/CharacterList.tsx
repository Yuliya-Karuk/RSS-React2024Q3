import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Loader } from '@components/Loader/Loader';
import { useData } from '@contexts/dataProvider';
import styles from './CharacterList.module.scss';

interface CharacterListProps {
  setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CharacterList = ({ setDetailsOpen }: CharacterListProps) => {
  const { data, isLoading } = useData();

  // const handleCloseDetails = () => {
  //   setDetailsOpen(false);

  //   // Удаляем параметр details из URL
  //   navigate({
  //     search: qs.stringify({ ...qs.parse(window.location.search, { ignoreQueryPrefix: true }), details: undefined }),
  //   });
  // };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      {data.results.length > 0 ? (
        <ul className={styles.mainContainer}>
          {data.results.map(character => (
            <CharacterItem key={character.name} character={character} setDetailsOpen={setDetailsOpen} />
          ))}
        </ul>
      ) : (
        <div className={styles.emptySearch}>Sorry, we couldn`t find anything matching your search.</div>
      )}
    </main>
  );
};
