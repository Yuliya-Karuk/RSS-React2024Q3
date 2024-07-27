import { Favorites } from '@components/Favorites/Favorites';
import { store } from '@store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockedFavorites } from 'src/testSetup/msw/mocks';
import { vi } from 'vitest';

const handleRemoveAllMock = vi.fn();

vi.mock('@hooks/useHandleFlyout', () => ({
  useHandleFlyout: vi.fn(() => ({
    downloadUrl: 'http://example.com/1_characters.csv',
    handleRemoveAll: handleRemoveAllMock,
  })),
}));

describe('Favorites Component', () => {
  it('should display the list of favorite items', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites favorites={mockedFavorites} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('(1 selected)')).toBeInTheDocument();

    expect(screen.getByText(/Luke Skywalker Mocked/i)).toBeInTheDocument();
  });

  it('should have a download link with correct href', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites favorites={mockedFavorites} />
        </MemoryRouter>
      </Provider>
    );

    const downloadLink = screen.getByLabelText('download');
    expect(downloadLink).toHaveAttribute('download', '1_characters.csv');
    expect(downloadLink).toHaveAttribute('href', 'http://example.com/1_characters.csv');
  });
});
