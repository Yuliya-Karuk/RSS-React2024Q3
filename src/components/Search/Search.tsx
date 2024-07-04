import { ChangeEvent, Component, FormEvent } from 'react';
import { DataContext, DataProviderState } from '../../contexts/dataProvider';
import { api } from '../../services/api';
import { storage } from '../../services/storage';
import styles from './Search.module.scss';

interface SearchState {
  searchValue: string;
}

export class Search extends Component<object, SearchState> {
  constructor(props: object) {
    super(props);
    const searchValue = storage.getStorage() || '';
    this.state = {
      searchValue,
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    this.setState({ searchValue });
    storage.setStorage(searchValue);
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { searchValue } = this.state;
    const { updateData } = this.context as DataProviderState;

    const data = await api.searchPeopleByName(searchValue);
    updateData(data);
  };

  render() {
    const { searchValue } = this.state;

    return (
      <form noValidate method="" className={styles.search} onSubmit={this.handleSubmit}>
        <input
          className={styles.searchInput}
          required
          type="text"
          placeholder="SEARCH ..."
          value={searchValue}
          onChange={this.handleInputChange}
        />
        <button type="submit" className={styles.searchIcon} aria-label="search button" />
      </form>
    );
  }
}

Search.contextType = DataContext;
