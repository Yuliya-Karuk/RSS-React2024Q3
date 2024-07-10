import { CharacterList } from '@components/CharacterList/CharacterList';
import { Loader } from '@components/Loader/Loader';
import { Pagination } from '@components/Pagination/Pagination';
import { useData } from '@contexts/dataProvider';
import { useLocalStorage } from '@hooks/useSearchQuery';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './home.module.scss';

export const Home = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { isLoading, totalPages, fetchData } = useData();
  const { getStorage } = useLocalStorage();
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(getStorage() || '');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentPage) {
      const params = new URLSearchParams({ search: searchQuery, page: String(currentPage) });
      navigate(`/?${params.toString()}`);
    }
  }, [currentPage, navigate, searchQuery]);

  useEffect(() => {
    const getParams = () => {
      const params = new URLSearchParams(location.search);
      const query = params.get('search') || '';
      const page = params.get('page') || '1';

      setCurrentPage(+page);
      setSearchQuery(query);
      fetchData(query, page);
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
    <div className={styles.page}>
      <CharacterList setDetailsOpen={setDetailsOpen} />
      {currentPage && <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
      {detailsOpen && <Outlet />}
    </div>
  );
};
