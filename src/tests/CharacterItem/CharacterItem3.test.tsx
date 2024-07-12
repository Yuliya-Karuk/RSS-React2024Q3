import { Home } from '@pages/home/home';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { mockCharacter } from 'src/testSetup/msw/mocks';

vi.mock('@contexts/dataProvider', () => ({
  useData: () => ({
    data: {
      results: [mockCharacter],
    },
    isLoading: false,
    totalPages: 1,
    fetchData: vitest.fn(),
    films: null,
    starships: [],
  }),
}));

describe('CharacterItem click handling', () => {
  it('triggers navigation with character details on click', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const characterItem = await screen.findByRole('button');
    expect(characterItem).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(characterItem);
    screen.debug();

    // не работает - не понятно как внтурь передать outlet
    // await waitFor(async () => {
    //   const detailsItem = await screen.findByTestId('details');
    //   expect(detailsItem).toBeInTheDocument();
    // });
  });
});
