import React, { Component, ReactNode } from 'react';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { PaginatedCharacters } from '../types/types';

type DataProviderProps = {
  children?: ReactNode;
};

export interface DataProviderState {
  data: PaginatedCharacters;
  isLoading: boolean;
  updateData: (data: PaginatedCharacters, isLoading: boolean) => void;
}

const initialData = {
  data: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
  isLoading: true,
  updateData: () => {},
};

export const DataContext = React.createContext<DataProviderState>(initialData);

export class DataProvider extends Component<DataProviderProps, DataProviderState> {
  constructor(props: DataProviderProps) {
    super(props);
    this.state = initialData;
    this.updateData = this.updateData.bind(this);
  }

  async componentDidMount() {
    let data;
    const storedSearchValue = storage.getStorage();

    if (storedSearchValue) {
      data = await api.searchPeopleByName(storedSearchValue);
    } else {
      data = await api.getPeople();
    }
    this.setState({ data, isLoading: false });
  }

  updateData(data: PaginatedCharacters, isLoading: boolean) {
    this.setState({ data, isLoading });
  }

  render() {
    const { data, isLoading } = this.state;
    const { children } = this.props;

    return (
      <DataContext.Provider value={{ data, isLoading, updateData: this.updateData }}>{children}</DataContext.Provider>
    );
  }
}
