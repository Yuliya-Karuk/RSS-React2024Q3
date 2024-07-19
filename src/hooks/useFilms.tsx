import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetFilmsQuery } from 'src/store/api/swapiApi';
import { setFilms } from 'src/store/charactersSlice';

import { selectFilms } from 'src/store/selectors';

export const useFilms = () => {
  const dispatch = useDispatch();
  const films = useSelector(selectFilms);
  const { data: fetchedFilms, error } = useGetFilmsQuery();

  useEffect(() => {
    if (films.length === 0 && fetchedFilms) {
      dispatch(setFilms(fetchedFilms));
    }
  }, [films, fetchedFilms, error, dispatch]);
};
