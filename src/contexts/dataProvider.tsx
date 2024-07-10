/* eslint-disable react-refresh/only-export-components */
import { storage } from '@services/storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { PaginatedCharacters } from '../models';
import { api } from '../services/api';

type DataProviderProps = {
  children?: ReactNode;
};

export interface DataContextValue {
  data: PaginatedCharacters;
  isLoading: boolean;
  updateData: (data: PaginatedCharacters, isLoading: boolean) => void;
}

const initialData: DataContextValue = {
  data: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
  isLoading: true,
  updateData: () => {},
};

export const DataContext = createContext<DataContextValue>(initialData);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<PaginatedCharacters>(initialData.data);
  const [isLoading, setIsLoading] = useState<boolean>(initialData.isLoading);

  const updateData = (newData: PaginatedCharacters, isLoadingState: boolean) => {
    setData(newData);
    setIsLoading(isLoadingState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedData;
        const storedSearchValue = storage.getStorage();

        if (storedSearchValue) {
          fetchedData = await api.searchPeopleByName(storedSearchValue);
        } else {
          fetchedData = await api.getPeople();
        }

        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return <DataContext.Provider value={{ data, isLoading, updateData }}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useAuth hook must be used within a AuthProvider');
  }

  return context;
};
