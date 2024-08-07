import { PaginationButton } from '@components/PaginationButton/PaginationButton';
import { getPaginationRange } from '@utils/utils';
import styles from './Pagination.module.scss';

const maxShownPages = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <nav className={styles.paginationNav} aria-label="Page navigation">
      {totalPages > 1 && (
        <ul className={styles.pagination}>
          <PaginationButton onClickNumber={1} isDisabled={currentPage === 1} ariaLabel="First" />
          <PaginationButton onClickNumber={currentPage - 1} isDisabled={currentPage === 1} ariaLabel="Previous" />
          {paginationRange.map(el => (
            <PaginationButton
              key={el}
              onClickNumber={el}
              element={el}
              isDisabled={false}
              ariaLabel={el === currentPage ? 'Active' : 'Not active'}
            />
          ))}
          {totalPages > maxShownPages && paginationRange.length === 5 && (
            <PaginationButton element="..." isDisabled ariaLabel="Empty" onClickNumber={1} />
          )}
          <PaginationButton
            onClickNumber={currentPage + 1}
            isDisabled={currentPage === totalPages || totalPages === 0}
            ariaLabel="Next"
          />
          <PaginationButton
            onClickNumber={totalPages}
            isDisabled={currentPage === totalPages || totalPages === 0}
            ariaLabel="Last"
          />
        </ul>
      )}
    </nav>
  );
};
