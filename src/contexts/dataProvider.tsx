/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from 'react';
import { PaginatedCharacters } from '../models';
import { api } from '../services/api';

const productPerPage: number = 10;

type DataProviderProps = {
  children?: ReactNode;
};

export interface DataContextValue {
  data: PaginatedCharacters;
  isLoading: boolean;
  totalPages: number;
  fetchData: (searchQuery: string, currentPage: string) => void;
}

const initialData: DataContextValue = {
  data: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
  isLoading: true,
  totalPages: 1,
  fetchData: () => {},
};

export const DataContext = createContext<DataContextValue>(initialData);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<PaginatedCharacters>(initialData.data);
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

  return <DataContext.Provider value={{ data, isLoading, totalPages, fetchData }}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useAuth hook must be used within a AuthProvider');
  }

  return context;
};
