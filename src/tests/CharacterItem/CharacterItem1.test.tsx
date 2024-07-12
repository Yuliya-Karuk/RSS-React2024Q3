import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Character } from '@models/index';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('CharacterItem rendering', () => {
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

  it('renders character data correctly', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} />
      </MemoryRouter>
    );

    const characterName = screen.getByText('Luke Skywalker');
    expect(characterName).toBeInTheDocument();

    const birthYear = screen.getByText('19 BBY');
    expect(birthYear).toBeInTheDocument();
  });
});
