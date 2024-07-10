import { ChangeEvent, Component, FormEvent } from 'react';
import { DataContext } from '../../contexts/dataProvider';
import { api } from '../../services/api';
import { storage } from '../../services/storage';
import styles from './Search.module.scss';

interface SearchState {
  searchValue: string;
}

export class Search extends Component<Record<string, never>, SearchState> {
  static contextType = DataContext;
  declare context: React.ContextType<typeof DataContext>;

  constructor(props: Record<string, never>) {
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

  updateSearchData = async (searchValue: string) => {
    const { data, updateData } = this.context;
    updateData(data, true);

    const newData = await api.searchPeopleByName(searchValue);
    updateData(newData, false);
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { searchValue } = this.state;
    this.updateSearchData(searchValue);
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
