import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockCharacter } from 'src/testSetup/msw/mocks';

describe('CharacterItem rendering', () => {
  it('renders character data correctly', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} isDetailsOpen={false} />
      </MemoryRouter>
    );

    const characterName = screen.getByText('Luke Skywalker Mocked');
    expect(characterName).toBeInTheDocument();

    const birthYear = screen.getByText('19BBY');
    expect(birthYear).toBeInTheDocument();
  });
});
