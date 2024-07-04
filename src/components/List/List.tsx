import { Component } from 'react';
import { DataContext, DataProviderState } from '../../contexts/dataProvider';
import { Character } from '../../types/types';

class DataListComponent extends Component {
  renderCharacterCards(context: DataProviderState) {
    return context?.data ? (
      <div>
        {context.data.results.map((character: Character) => (
          <p key={character.name}>{character.name}</p>
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
        {context => (
          <main>
            <h1>Search Results</h1>
            {this.renderCharacterCards(context)}
          </main>
        )}
      </DataContext.Consumer>
    );
  }
}

export default DataListComponent;
