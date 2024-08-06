import { Favorites } from '@components/Favorites/Favorites';
import { screen } from '@testing-library/react';
import { mockedFavorites } from '@testSetup/msw/mocks';
import { renderWithProviders } from '@testSetup/render-router';
import { vi } from 'vitest';

const handleRemoveAllMock = vi.fn();

vi.mock('@hooks/useHandleFlyout', () => ({
  useHandleFlyout: vi.fn(() => ({
    downloadUrl: 'http://example.com/1_characters.csv',
    handleRemoveAll: handleRemoveAllMock,
  })),
}));

vi.mock('@hooks/useStoreHooks', () => ({
  useAppSelector: vi.fn(() => mockedFavorites),
  useAppDispatch: vi.fn(),
}));

describe('Favorites Component', () => {
  it('should display the list of favorite items', () => {
    renderWithProviders(<Favorites />);

    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('(1 selected)')).toBeInTheDocument();

    expect(screen.getByText(/Luke Skywalker Mocked/i)).toBeInTheDocument();
  });

  it('should have a download link with correct href', async () => {
    renderWithProviders(<Favorites />);

    const downloadLink = screen.getByLabelText('download');
    expect(downloadLink).toHaveAttribute('download', '1_characters.csv');
    expect(downloadLink).toHaveAttribute('href', 'http://example.com/1_characters.csv');
  });
});
