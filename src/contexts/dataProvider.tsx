/* eslint-disable react-refresh/only-export-components */
import { useLocalStorage } from '@hooks/useSearchQuery';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { PaginatedCharacters } from '../models';
import { api } from '../services/api';

const productPerPage: number = 10;

type DataProviderProps = {
  children?: ReactNode;
};

export interface DataContextValue {
  data: PaginatedCharacters;
  isLoading: boolean;
  currentPage: number | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<number | null>>;
  totalPages: number;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const initialData: DataContextValue = {
  data: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
  isLoading: true,
  currentPage: null,
  setCurrentPage: () => {},
  totalPages: 1,
  searchQuery: '',
  setSearchQuery: () => {},
};

export const DataContext = createContext<DataContextValue>(initialData);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<PaginatedCharacters>(initialData.data);
  const [isLoading, setIsLoading] = useState<boolean>(initialData.isLoading);
  // const { errorNotify } = useToast();
  // const location = useLocation();
  // const navigate = useNavigate();

  const { getStorage } = useLocalStorage();
  const [currentPage, setCurrentPage] = useState<number | null>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(getStorage() || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.searchPeopleByName(searchQuery, String(currentPage));

        setTotalPages(Math.ceil(response.count / productPerPage));
        setCurrentPage(currentPage === null ? 1 : currentPage);
        setData(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchQuery]);

  return (
    <DataContext.Provider
      value={{ data, isLoading, currentPage, setCurrentPage, totalPages, searchQuery, setSearchQuery }}
    >
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
