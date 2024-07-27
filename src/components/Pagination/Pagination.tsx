import { useTheme } from '@contexts/themeProvider';
import { getPaginationRange } from '@utils/utils';
import classnames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Pagination.module.scss';

const maxShownPages = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const paginationRange = getPaginationRange(currentPage, totalPages);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', String(page));
    navigate(`/?${params.toString()}`);
  };

  return (
    <nav className={styles.paginationNav} aria-label="Page navigation">
      {totalPages > 1 && (
        <ul className={styles.pagination}>
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.first]: true, [styles.light]: theme === 'light' })}
              onClick={() => handlePageChange(1)}
              aria-label="First"
              disabled={currentPage === 1}
            >
              <span aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.previous]: true, [styles.light]: theme === 'light' })}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous"
              disabled={currentPage === 1}
            >
              <span aria-hidden="true" />
            </button>
          </li>
          {paginationRange.map(el => (
            <li key={el}>
              <button
                type="button"
                className={classnames(styles.pgnButton, {
                  [styles.light]: theme === 'light',
                  [styles.active]: el === currentPage,
                })}
                onClick={() => handlePageChange(el)}
              >
                {el}
              </button>
            </li>
          ))}
          {totalPages > maxShownPages && paginationRange.length === 5 && (
            <li>
              <button
                type="button"
                className={classnames(styles.pgnButton, { [styles.empty]: true, [styles.light]: theme === 'light' })}
                disabled
              >
                ...
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.next]: true, [styles.light]: theme === 'light' })}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.last]: true, [styles.light]: theme === 'light' })}
              onClick={() => handlePageChange(totalPages)}
              aria-label="Last"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span aria-hidden="true" />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};
