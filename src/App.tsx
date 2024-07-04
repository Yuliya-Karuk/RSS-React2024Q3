/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import styles from './App.module.scss';
import { CharacterList } from './components/CharacterList/CharacterList';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { Header } from './components/Header/Header';
import { DataProvider } from './contexts/dataProvider';

export class App extends Component {
  render() {
    return (
      <DataProvider>
        <div className={styles.page}>
          <Header />
          <CharacterList />
          <ErrorButton />
        </div>
      </DataProvider>
    );
  }
}
