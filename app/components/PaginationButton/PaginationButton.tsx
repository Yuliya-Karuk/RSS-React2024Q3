import { useTheme } from '@contexts/themeProvider';
import { useSearchParams } from '@remix-run/react';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(page));
    setSearchParams(params);
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
