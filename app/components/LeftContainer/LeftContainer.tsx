import { CharacterList } from '@components/CharacterList/CharacterList';
import { Pagination } from '@components/Pagination/Pagination';
import { PaginatedCharactersWithId } from '@models/index';
import styles from './LeftContainer.module.scss';

interface LeftContainerProps {
  paginatedCharacters: PaginatedCharactersWithId;
  totalPages: number;
  details: string;
  page: string;
}

export default function LeftContainer({ paginatedCharacters, details, page, totalPages }: LeftContainerProps) {
  return (
    <div className={styles.leftContainer}>
      <CharacterList characters={paginatedCharacters.results} isDetailsOpen={Boolean(details)} />
      {page && <Pagination currentPage={Number(page)} totalPages={totalPages} />}
    </div>
  );
}
