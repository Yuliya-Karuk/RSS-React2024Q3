'use client';

import { Film } from '@models/index';
/* eslint-disable react-refresh/only-export-components */

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

interface FilmsContextType {
  films: Film[];
}

type FilmsProviderProps = {
  children?: ReactNode;
};

const FilmsContext = createContext<FilmsContextType | undefined>(undefined);

export const FilmsProvider = ({ children }: FilmsProviderProps) => {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const filmsResponse = await fetch('https://swapi.dev/api/films/', {
          method: 'GET',
        });

        const data = await filmsResponse.json();
        setFilms(data.results);
      } catch (error) {
        console.error('Failed to fetch films:', error);
      }
    };

    if (films.length === 0) {
      fetchFilms();
    }
  }, [films]);

  const value = useMemo(() => ({ films }), [films]);

  return <FilmsContext.Provider value={value}>{children}</FilmsContext.Provider>;
};

export const useFilms = () => {
  const context = useContext(FilmsContext);

  if (context === undefined) {
    throw new Error('useFilms must be used within a FilmsProvider');
  }
  return context;
};
