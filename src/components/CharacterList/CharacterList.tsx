import { Component } from 'react';
import { DataContext, DataProviderState } from '../../contexts/dataProvider';
import { Character } from '../../types/types';
import { CharacterItem } from '../CharacterItem/CharacterItem';
import styles from './CharacterList.module.scss';

export class CharacterList extends Component {
  renderCharacterCards(context: DataProviderState) {
    return context?.data ? (
      <div className={styles.mainContainer}>
        {context.data.results.map((character: Character) => (
          <CharacterItem key={character.name} character={character} />
        ))}
      </div>
    ) : (
      <div>
        <div>Nothing</div>
      </div>
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
