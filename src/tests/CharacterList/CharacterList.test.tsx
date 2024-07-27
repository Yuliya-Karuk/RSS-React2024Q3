import { CharacterList } from '@components/CharacterList/CharacterList';
import { screen } from '@testing-library/react';
import { mockedCharacters } from 'src/testSetup/msw/mocks';
import { renderWithRouter } from 'src/testSetup/render-router';
import { describe, expect, vi } from 'vitest';

vi.mock('@hooks/useHandleDetails', () => ({
  useHandleDetails: () => ({
    closeDetails: vi.fn(),
    openDetails: vi.fn(),
  }),
}));

describe('CharacterList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('check that an appropriate message is displayed if no cards are present', () => {
    renderWithRouter(<CharacterList characters={[]} isDetailsOpen={false} />, {
      route: '/',
    });

    const emptyMessage = screen.getByText(/Sorry, we couldn't find anything matching your search./i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('verify that the component renders the specified number of cards', async () => {
    renderWithRouter(<CharacterList characters={mockedCharacters.results} isDetailsOpen={false} />, {
      route: '/',
    });

    const characterItems = await screen.findAllByTestId('item');
    expect(characterItems.length).toBe(mockedCharacters.results.length);
  });
});
