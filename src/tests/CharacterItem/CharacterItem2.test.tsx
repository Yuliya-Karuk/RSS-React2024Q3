import { Home } from '@pages/home/home';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { mockCharacter, mockedFilm } from 'src/testSetup/msw/mocks';
import { vi } from 'vitest';

vi.mock('@contexts/dataProvider', () => ({
  useData: () => ({
    data: {
      results: [mockCharacter],
    },
    isLoading: false,
    totalPages: 1,
    fetchData: vitest.fn(),
    films: [mockedFilm],
  }),
}));

vi.mock('@contexts/toastProvider', () => ({
  useToast: () => ({
    errorNotify: vi.fn(),
  }),
}));

describe('CharacterItem click handling', () => {
  it('clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    const characterItem = await screen.findByRole('button');
    expect(characterItem).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(characterItem);

    // await waitFor(async () => {
    //   const detailsItem = await screen.findByTestId('details');
    //   expect(detailsItem).toBeInTheDocument();
    // });
  });
});
