import { CharacterList } from '@components/CharacterList/CharacterList';
import { Loader } from '@components/Loader/Loader';
import { Pagination } from '@components/Pagination/Pagination';
import { useData } from '@contexts/dataProvider';
import { useLocalStorage } from '@hooks/useSearchQuery';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './home.module.scss';

export const Home = () => {
  const [searchDetails, setSearchDetails] = useState<string>('');
  const { isLoading, totalPages, fetchData, data } = useData();
  const { getStorage } = useLocalStorage();
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(getStorage() || '');
  const location = useLocation();

  useEffect(() => {
    const getParams = () => {
      const params = new URLSearchParams(location.search);
      const query = getStorage() || '';
      const page = params.get('page') || '1';
      const details = params.get('details') || '';

      if (query !== searchQuery || +page !== currentPage) {
        fetchData(query, page);
      }
      setCurrentPage(+page);
      setSearchQuery(query);
      setSearchDetails(details);
    };

    getParams();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {data && data.results.length > 0 ? (
          <div className={styles.leftContainer}>
            <CharacterList characters={data?.results} isDetailsOpen={Boolean(searchDetails)} />
            {currentPage && <Pagination currentPage={currentPage} totalPages={totalPages} />}
          </div>
        ) : (
          <div className={styles.emptySearch}>Sorry, we couldn`t find anything matching your search.</div>
        )}
        {Boolean(searchDetails) && <Outlet />}
      </div>
    </main>
  );
};
