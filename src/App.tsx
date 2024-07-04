/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import styles from './App.module.scss';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import List from './components/List/List';
import { Search } from './components/Search/Search';
import { DataProvider } from './contexts/dataProvider';

class App extends Component {
  render() {
    return (
      <DataProvider>
        <div className={styles.page}>
          <h1>Star Wars</h1>
          <Search />
          <ErrorButton />
          <List />
        </div>
      </DataProvider>
    );
  }
}

export default App;
