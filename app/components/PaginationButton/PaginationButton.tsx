import { useTheme } from '@contexts/themeProvider';
import { useNavigate, useSearchParams } from '@remix-run/react';
import classnames from 'classnames';
import styles from './PaginationButton.module.scss';

interface PaginationProps {
  onClickNumber: number;
  isDisabled: boolean;
  ariaLabel: string;
  element?: number | string;
}

export const PaginationButton = ({ onClickNumber, element, isDisabled, ariaLabel }: PaginationProps) => {
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const details = searchParams.get('details');
  const query = searchParams.get('query');

  const handlePageChange = (page: number) => {
    const newQuery = new URLSearchParams({
      page: `${page}`,
      ...(query && { query }),
      ...(details && { details }),
    }).toString();

    navigate(`?${newQuery}`);
  };

  return (
    <li>
      <button
        type="button"
        className={classnames(styles.pgnButton, {
          [styles.first]: ariaLabel === 'First',
          [styles.previous]: ariaLabel === 'Previous',
          [styles.active]: ariaLabel === 'Active',
          [styles.empty]: ariaLabel === 'Empty',
          [styles.next]: ariaLabel === 'Next',
          [styles.last]: ariaLabel === 'Last',
          [styles.light]: theme === 'light',
        })}
        onClick={() => handlePageChange(onClickNumber)}
        aria-label={ariaLabel}
        disabled={isDisabled}
      >
        {element || <span aria-hidden="true" />}
      </button>
    </li>
  );
};
