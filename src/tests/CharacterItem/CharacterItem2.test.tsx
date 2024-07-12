import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Character } from '@models/index';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('CharacterItem click handling', () => {
  const mockCharacter: Character = {
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/1/',
    birth_year: '19 BBY',
    gender: 'male',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    homeworld: '',
    films: [''],
    species: [''],
    vehicles: [''],
    starships: [''],
    created: '',
    edited: '',
  };

  it('triggers navigation with character details on click', async () => {
    const { container } = render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} />
      </MemoryRouter>
    );

    const listItem = container.querySelector('li');
    if (!listItem) {
      throw new Error('ListItem not found');
    }

    fireEvent.click(listItem);

    setTimeout(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const detailsParam = queryParams.get('details');
      expect(detailsParam).toEqual('1');
    }, 2000);
  });
});
