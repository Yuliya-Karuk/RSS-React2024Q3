import { CharacterList } from '@components/CharacterList/CharacterList';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@components/CharacterItem/CharacterItem', () => ({
  CharacterItem: () => <div>Mock Character</div>,
}));

describe('CharacterList1', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('Check that an appropriate message is displayed if no cards are present.', () => {
    vi.mock('@contexts/dataProvider', () => ({
      useData: () => ({
        data: {
          results: [],
        },
      }),
    }));

    render(<CharacterList />);
    expect(screen.getByText('Sorry, we couldn`t find anything matching your search.')).toBeInTheDocument();
  });
});
