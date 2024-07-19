/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { PaginatedCharacters, PaginatedFilms } from '../models';
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
}

const initialData: DataContextValue = {
  data: null,
  isLoading: true,
  totalPages: 1,
  fetchData: () => {},
  films: null,
};

export const DataContext = createContext<DataContextValue>(initialData);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<PaginatedCharacters | null>(null);
  const [films, setFilms] = useState<PaginatedFilms | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(initialData.isLoading);
  const [totalPages, setTotalPages] = useState<number>(1);

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

    fetchFilms();
  }, []);

  return (
    <DataContext.Provider value={{ data, isLoading, totalPages, fetchData, films }}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useData hook must be used within a DataProvider');
  }

  return context;
};
