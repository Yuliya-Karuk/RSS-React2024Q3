import { CharacterList } from '@components/CharacterList/CharacterList';
import { Pagination } from '@components/Pagination/Pagination';
import { useData } from '@contexts/dataProvider';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './home.module.scss';

export const Home = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { currentPage, setCurrentPage, totalPages } = useData();

  return (
    <div className={styles.page}>
      <CharacterList setDetailsOpen={setDetailsOpen} />
      {currentPage && <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
      {detailsOpen && <Outlet />}
    </div>
  );
};
