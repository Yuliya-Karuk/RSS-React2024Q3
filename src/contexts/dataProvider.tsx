/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { PaginatedCharacters, PaginatedFilms, Starship } from '../models';
import { api } from '../services/api';

const productPerPage: number = 10;

type DataProviderProps = {
  children?: ReactNode;
};

export interface DataContextValue {
  data: PaginatedCharacters | null;
  isLoading: boolean;
  totalPages: number;
  fetchData: (searchQuery: string, currentPage: string) => void;
  films: PaginatedFilms | null;
  starships: Starship[];
}

const initialData: DataContextValue = {
  data: null,
  isLoading: true,
  totalPages: 1,
  fetchData: () => {},
  films: null,
  starships: [],
};

export const DataContext = createContext<DataContextValue>(initialData);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<PaginatedCharacters | null>(null);
  const [films, setFilms] = useState<PaginatedFilms | null>(null);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(initialData.isLoading);
  const [totalPages, setTotalPages] = useState<number>(1);

  const starshipsFetched = useRef(false);

  const fetchData = async (searchQuery: string, currentPage: string) => {
    setIsLoading(true);
    try {
      const response = await api.searchPeopleByName(searchQuery, currentPage);
      setTotalPages(Math.ceil(response.count / productPerPage));
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const filmsResponse = await api.getAllFilms();
        setFilms(filmsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchStarships = async (url: string) => {
      try {
        const starshipsResponse = await api.getAllStarShips(url);
        setStarships(prev => [...prev, ...starshipsResponse.results]);
        if (starshipsResponse.next !== null) {
          fetchStarships(starshipsResponse.next);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFilms();
    if (!starshipsFetched.current) {
      fetchStarships('https://swapi.dev/api/starships/');
      starshipsFetched.current = true;
    }
  }, []);

  return (
    <DataContext.Provider value={{ data, isLoading, totalPages, fetchData, films, starships }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useAuth hook must be used within a AuthProvider');
  }

  return context;
};
