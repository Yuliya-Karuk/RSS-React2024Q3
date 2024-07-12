import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockCharacter } from 'src/testSetup/msw/mocks';

describe('CharacterItem rendering', () => {
  it('renders character data correctly', () => {
    render(
      <MemoryRouter>
        <CharacterItem character={mockCharacter} />
      </MemoryRouter>
    );

    const characterName = screen.getByText('Luke Skywalker Mocked');
    expect(characterName).toBeInTheDocument();

    const birthYear = screen.getByText('19BBY');
    expect(birthYear).toBeInTheDocument();
  });

  // it('triggers navigation with character details on click', async () => {
  //   const { container } = render(
  //     <MemoryRouter>
  //       <CharacterItem character={mockCharacter} />
  //     </MemoryRouter>
  //   );

  //   const user = userEvent.setup();

  //   const listItem = container.querySelector('li');
  //   if (!listItem) {
  //     throw new Error('ListItem not found');
  //   }

  //   await user.click(listItem);

  //   setTimeout(async () => {
  //     const queryParams = new URLSearchParams(window.location.search);
  //     const detailsParam = queryParams.get('details');
  //     expect(detailsParam).toEqual('1');
  //   }, 1000);
  // });
});
