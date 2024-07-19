import { CharacterList } from '@components/CharacterList/CharacterList';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@components/CharacterItem/CharacterItem', () => ({
  CharacterItem: () => <div>Mock Character</div>,
}));

describe('CharacterList2', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('Verify that the component renders the specified number of cards', () => {
    vi.mock('@contexts/dataProvider', () => ({
      useData: () => ({
        data: {
          results: [{ name: 'Character 1' }, { name: 'Character 2' }, { name: 'Character 3' }],
        },
      }),
    }));

    render(<CharacterList characters={[]} isDetailsOpen={false} />);
    expect(screen.getAllByText('Mock Character')).toHaveLength(3);
  });
});
