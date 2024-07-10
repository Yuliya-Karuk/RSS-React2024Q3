import { Component } from 'react';
import { DataContext, DataProviderState } from '../../contexts/dataProvider';
import { Character } from '../../types/types';
import { CharacterItem } from '../CharacterItem/CharacterItem';
import { Loader } from '../Loader/Loader';
import styles from './CharacterList.module.scss';

export class CharacterList extends Component {
  renderCharacterCards(context: DataProviderState) {
    if (context.isLoading) {
      return <Loader />;
    }

    return context.data.results.length > 0 ? (
      <div className={styles.mainContainer}>
        {context.data.results.map((character: Character) => (
          <CharacterItem key={character.name} character={character} />
        ))}
      </div>
    ) : (
      <div className={styles.emptySearch}>Sorry, we couldn`t find anything matching your search.</div>
    );
  }

  render() {
    return (
      <DataContext.Consumer>
        {context => <main className={styles.main}>{this.renderCharacterCards(context)}</main>}
      </DataContext.Consumer>
    );
  }
}
