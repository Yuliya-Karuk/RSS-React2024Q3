import { useTheme } from '@contexts/themeProvider';
import classnames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './PaginationButton.module.scss';

interface PaginationProps {
  onClickNumber: number;
  isDisabled: boolean;
  ariaLabel: string;
  element?: number | string;
}

export const PaginationButton = ({ onClickNumber, element, isDisabled, ariaLabel }: PaginationProps) => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const details = searchParams && searchParams.get('details');
  const query = searchParams && searchParams.get('query');

  const handlePageChange = (page: number) => {
    const newQuery = new URLSearchParams({
      page: `${page}`,
      ...(query && { query }),
      ...(details && { details }),
    }).toString();

    router.push(`?${newQuery}`);
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
