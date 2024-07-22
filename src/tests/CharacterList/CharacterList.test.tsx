import { CharacterList } from '@components/CharacterList/CharacterList';
import { render, screen } from '@testing-library/react';
import { mockedCharacters } from 'src/testSetup/msw/mocks';
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

  it('verify that the component renders the specified number of cards', () => {
    render(<CharacterList characters={[]} isDetailsOpen={false} />);

    const emptyMessage = screen.getByText(/Sorry, we couldn`t find anything matching your search./i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('check that an appropriate message is displayed if no cards are present', () => {
    render(<CharacterList characters={mockedCharacters.results} isDetailsOpen={false} />);

    const characterItems = screen.getAllByRole('button');
    expect(characterItems.length).toBe(mockedCharacters.results.length);
  });
});
