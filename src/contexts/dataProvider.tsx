import React, { Component, ReactNode } from 'react';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { APIResponse } from '../types/types';

type DataProviderProps = {
  children?: ReactNode;
};

export interface DataProviderState {
  data: APIResponse;
  updateData: (data: APIResponse) => void;
}

const initialData = {
  data: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
  updateData: () => {},
};

export const DataContext = React.createContext<DataProviderState>(initialData);

export class DataProvider extends Component<DataProviderProps, DataProviderState> {
  constructor(props: object) {
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
    this.setState({ data });
  }

  updateData(data: APIResponse) {
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    const { children } = this.props;

    return <DataContext.Provider value={{ data, updateData: this.updateData }}>{children}</DataContext.Provider>;
  }
}
