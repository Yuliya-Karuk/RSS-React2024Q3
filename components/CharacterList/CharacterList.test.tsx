import { CharacterList } from '@components/CharacterList/CharacterList';
import { screen } from '@testing-library/react';
import { mockedCharacters } from '@testSetup/msw/mocks';
import { renderWithProviders } from '@testSetup/render-router';
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
    renderWithProviders(<CharacterList characters={[]} isDetailsOpen={false} />);

    const emptyMessage = screen.getByText(/Sorry, we couldn't find anything matching your search./i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('verify that the component renders the specified number of cards', async () => {
    renderWithProviders(<CharacterList characters={mockedCharacters.results} isDetailsOpen={false} />);

    const characterItems = await screen.findAllByTestId('item');
    expect(characterItems.length).toBe(mockedCharacters.results.length);
  });
});
